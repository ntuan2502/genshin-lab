export function skillFunction(markup) {
    var temp = markup;
    for (let i = 0; i < 50; i++) {
        if (i % 2 == 0) temp = temp.replace(/\*\*/, '<span style="color: #FFD780FF;">');
        else temp = temp.replace(/\*\*/, '</span> ');
    }
    temp = temp
        .replace(/·/g, '- ')
        .replace(/<span>/g, '<span style="font-weight: bold;">')
        .replace(/\n/g, '<br>');
    return { __html: temp };
}
