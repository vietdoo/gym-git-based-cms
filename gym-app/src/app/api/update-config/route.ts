import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, config } = body;

    // Check authentication
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!config) {
      return NextResponse.json({ error: 'Config data is required' }, { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || 'main';
    const path = 'data/gym-config.json';

    if (!token || !owner || !repo) {
       return NextResponse.json({ error: 'GitHub configuration missing in environment variables' }, { status: 500 });
    }

    const octokit = new Octokit({ auth: token });

    // 1. Lấy SHA hiện tại của file
    let sha = '';
    try {
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });

      if ('sha' in response.data) {
        sha = response.data.sha;
      }
    } catch (e: unknown) {
      // Bỏ qua nếu file chưa tồn tại
      if (typeof e === 'object' && e !== null && 'status' in e && (e as { status: number }).status !== 404) {
        throw e;
      }
    }

    // 2. Commit nội dung mới
    const content = Buffer.from(JSON.stringify(config, null, 2)).toString('base64');

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'chore: update gym content via admin dashboard',
      content,
      sha: sha || undefined,
      branch,
    });

    // 3. Revalidate path
    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'Config updated successfully' });
  } catch (error: unknown) {
    console.error('Error updating config:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}
