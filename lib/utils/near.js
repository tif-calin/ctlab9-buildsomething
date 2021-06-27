import fetch from 'node-fetch';

export const addFriend = async friend => {
  const res = await fetch('https://rpc.testnet.near.org', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'dontcare',
      method: 'query',
      params: {
        request_type: 'view_account',
        finality: 'optimistic',
        account_id: friend.accountId
      }
    })
  });

  return (await res.json()).result;
};
