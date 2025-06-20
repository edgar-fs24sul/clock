// Função do relógio
function updateClock(){
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${mins}:${secs}`;
}

setInterval(updateClock, 1000);
updateClock();

// Função Localização
function showLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Chamada para API do OpenCage
        const apiKey = 'e4cc69c63cd84cecb0a668e768e90ea4';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&language=pt`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
            if (data.results.length > 0) {
                const location = data.results[0].components;
                const cidade = location.city || location.town || location.village || 'Cidade não encontrada';
                const pais = location.country || 'País não encontrado';
                document.getElementById('location').textContent = `Você está em: ${cidade}, ${pais}`;
            } else {
                document.getElementById('location').textContent = "Localização não encontrada.";
            }
            })
            .catch(error => {
            document.getElementById('location').textContent = "Erro ao buscar cidade.";
            });
        },
        function(error) {
        document.getElementById('location').textContent = `Erro ao obter localização: ${error.message}`;
        }
    );
    } else {
    document.getElementById('location').textContent = "Geolocalização não suportada.";
    }
}

showLocation();