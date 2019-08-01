console.log('hello');
//text="key1=value1;key2=value2\nkeyA=valueA\n..."

function store(aArr) {
  return aArr
    .map(r => {
      let rT = [];
      for (const c in r) {
        rT.push(c + '=' + r[c]);
      }
      return rT.join(';');
    })
    .join('\n');
}

function load(text) {
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

var runLoad = () => {
  console.log('----start load----');
  const text = 'key1=value1;key2=value2\nkeyA=valueA\n';

  const a = load(text);

  console.log(a);
  console.log(a[0]['key1']);
  console.log(a[0]['key2']);
  console.log(a[1]['keyA']);
  console.log('----end load----');
};

var runStore = () => {
  console.log('----start load----');
  const a = [{ key1: 'value1', key2: 'value2' }, { keyA: 'valueA' }];

  const text = store(a);
  console.log(text);
  console.log('----end load----');
};

runLoad();
runStore();
