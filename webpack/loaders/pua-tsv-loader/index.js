// Use node syntax here

module.exports = function(data) {
    const rows = data.split(/\r?\n/)
        .map(line => line.trim().split('\t'))
        .map(([ pua, unicode, description ]) => ({ pua, unicode, description }))

    return `export default ${JSON.stringify(rows, null)
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')}`
}