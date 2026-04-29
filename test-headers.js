
async function test() {
    try {
        const res = await fetch('http://localhost:3000/api/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ professorName: 'Share Prof', courseCode: 'SHARE101', radius: 50, durationMinutes: 10, latitude: 0, longitude: 0 })
        });
        const session = await res.json();
        console.log('Session ID:', session.id);

        const exportRes = await fetch(`http://localhost:3000/api/export/${session.id}`);
        console.log('Content-Disposition:', exportRes.headers.get('content-disposition'));
        console.log('Content-Type:', exportRes.headers.get('content-type'));
    } catch (e) {
        console.error(e);
    }
}
test();
