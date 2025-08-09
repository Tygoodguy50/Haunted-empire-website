// Additional admin features for webhook registration dashboard
// Example: Delete registration, view details, refresh

document.addEventListener('DOMContentLoaded', () => {
  loadRegistrations();
});

async function loadRegistrations() {
  const platform = document.getElementById('platform').value;
  const creatorId = document.getElementById('creatorId').value;
  let url = '/admin/webhook-registrations';
  if (platform || creatorId) {
    url = `/admin/webhook-registrations/search?`;
    if (platform) url += `platform=${platform}&`;
    if (creatorId) url += `creatorId=${creatorId}`;
  }
  
  try {
    const res = await fetch(url, { headers: { 'x-user-role': 'admin' } });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API returned non-JSON response');
    }
    
    const data = await res.json();
    const tbody = document.querySelector('#registrations tbody');
    tbody.innerHTML = '';
    (data.registrations || []).forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.platform}</td>
      <td>${r.callbackUrl}</td>
      <td>${(r.eventTypes || []).join(', ')}</td>
      <td>${r.creator ? r.creator.username || r.creator._id : ''}</td>
      <td>${new Date(r.registeredAt).toLocaleString()}</td>
      <td>${r.registrationResponse ? 'Registered' : 'Error'}</td>
      <td><button onclick="deleteRegistration('${r._id}')">Delete</button></td>
      <td><button onclick="viewDetails('${r._id}')">Details</button></td>
    `;
    tbody.appendChild(tr);
  });
  } catch (err) {
    console.warn('Failed to load registrations:', err.message);
    const tbody = document.querySelector('#registrations tbody');
    tbody.innerHTML = '<tr><td colspan="8">Admin service temporarily unavailable</td></tr>';
  }
}

async function deleteRegistration(id) {
  if (!confirm('Delete this registration?')) return;
  const res = await fetch(`/admin/webhook-registrations/${id}`, {
    method: 'DELETE',
    headers: { 'x-user-role': 'admin' }
  });
  if (res.ok) loadRegistrations();
}

async function viewDetails(id) {
  const res = await fetch(`/admin/webhook-registrations/${id}`, {
    headers: { 'x-user-role': 'admin' }
  });
  const data = await res.json();
  alert(JSON.stringify(data.registration, null, 2));
}
