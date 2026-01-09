"use client";

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/db-status')
      .then((res) => res.json())
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch((err) => {
        if (mounted) setData({ error: String(err) });
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!data) return <div className="p-6">Loading DB status…</div>;
  if (data.error) return <div className="p-6 text-red-600">Error: {data.error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Database Status</h1>
      <div className="mb-4">Events: <strong>{data.events}</strong></div>
      <div className="mb-6">Attendees: <strong>{data.attendees}</strong></div>

      <h2 className="text-xl font-semibold mb-2">Sample Events</h2>
      <ul className="list-disc pl-6">
        {data.sample?.map((e: any) => (
          <li key={e.id}>{e.title} <span className="text-sm text-gray-500">({e.id})</span></li>
        ))}
      </ul>
    </div>
  );
}
