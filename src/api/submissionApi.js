import { create } from 'ipfs-http-client';

const client = create('https://ipfs.infura.io:5001/api/v0')

const BASE_URL = "http://localhost:3000/entries/";


export async function UploadForm(ipfs_url, title, address) {
  const body = JSON.stringify({ url: ipfs_url, title, address});

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  };

  const res = await fetch(`${BASE_URL}/submit`, requestOptions);
  if (!res.ok) { throw new Error(res.statusText); }
  return res;
}

export async function UploadFile(file) {
  const added = await client.add(file);
  return `https://ipfs.infura.io/ipfs/${added.path}`;
}