export function getDadosApi(url) {
    return fetch(url).then(response => response.json())
}