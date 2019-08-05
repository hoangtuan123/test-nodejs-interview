//text="key1=value1;key2=value2\nkeyA=valueA\n..."

module.exports.store = aArr => {
  if (!aArr || !aArr.length) return '';
  return aArr
    .map(r => {
      return Object.keys(r)
        .map(n => n.concat('=', r[n]))
        .join(';');
    })
    .join('\n')
    .concat('\n');
};

module.exports.load = text => {
  let textArr = text.split('\n');
  if (!textArr || !textArr.length) return '';

  return (
    textArr
      .filter(i => i)
      .map((t, i) => {
        return t
          .split(';')
          .filter(e => e)
          .map(e => e.split('='))
          .reduce((p, c) => {
            p[c[0]] = c[1];
            return p;
          }, {});
      })
  );
};
