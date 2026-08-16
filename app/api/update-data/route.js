import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Ensure environment variables are set
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO || 'vishal003/vb';
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
    const FILE_PATH = 'lib/data.json';
    
    if (!GITHUB_TOKEN) {
      console.warn('GITHUB_TOKEN is missing. Returning success to allow local development.');
      // If we don't have a token, we just let it pass so local development doesn't break,
      // but it won't actually trigger a GitHub update.
      return NextResponse.json({ success: true, message: 'Simulated save.' });
    }

    const githubApiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;

    // 1. Get the current file SHA to update it
    let sha = null;
    try {
      const getFileRes = await fetch(`${githubApiUrl}?ref=${GITHUB_BRANCH}`, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        cache: 'no-store'
      });
      
      if (getFileRes.ok) {
        const fileData = await getFileRes.json();
        sha = fileData.sha;
      }
    } catch (e) {
      console.error('Error fetching file SHA:', e);
    }

    // 2. Prepare the new content
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

    // 3. Commit the new file
    const commitBody = {
      message: 'Update portfolio data via Admin Panel',
      content: content,
      branch: GITHUB_BRANCH,
    };
    
    if (sha) {
      commitBody.sha = sha;
    }

    const updateRes = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commitBody),
    });

    if (!updateRes.ok) {
      const errorText = await updateRes.text();
      throw new Error(`GitHub API error: ${updateRes.status} ${errorText}`);
    }

    return NextResponse.json({ success: true, message: 'Successfully updated GitHub and triggered rebuild.' });
  } catch (error) {
    console.error('Update Data Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
