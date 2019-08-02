console.log('hello');
//text="key1=value1;key2=value2\nkeyA=valueA\n..."

module.exports.store = (aArr) => {
  if (!aArr || !aArr.length) return '';
  return aArr
    .map(r => {
      let rT = [];
      for (const c in r) {
        rT.push(c + '=' + r[c]);
      }
      return rT.join(';');
    })
    .join('\n').concat('\n');
}

module.exports.load = (text) => {
  let textArr = text.split('\n');

  if (!textArr || !textArr.length) return;

  textArr = textArr.filter(i => i);

  textMapArr = textArr.map((t, i) => {
    const rowSplit = t.split(';');

    let rowArr = {};
    for (let col of rowSplit) {
      const objSplit = col.split('=');
      rowArr[objSplit[0]] = objSplit[1];
    }

    return rowArr;
  });

  return textMapArr;
}
