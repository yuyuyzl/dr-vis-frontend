import color from "color";

function gra(l,r) {
    return {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [{
            offset: 0, color: l
        }, {
            offset: 1, color: r
        }],
        global: false,
        midColor:color(l).mix(color(r),0.5).rgb().string()
    }
}

let colorList=[
    gra('#ff9a9e','#fad0c4'),
    gra('#fdcbf1','#e6dee9'),
    gra('#a1c4fd','#c2e9fb'),
    gra('#d4fc79','#96e6a1'),
    gra('#84fab0','#8fd3f4'),
    gra('#cfd9df','#e2ebf0'),
    gra('#e0c3fc','#8ec5fc'),
    gra('#f5f7fa','#c3cfe2'),
    gra('#667eea','#764ba2'),
    gra('#a18cd1','#fbc2eb'),
    gra('#fad0c4','#ffd1ff'),
    gra('#ffecd2','#fcb69f'),
    gra('#fdfcfb','#e2d1c3'),
    gra('#89f7fe','#66a6ff'),
    gra('#fddb92','#d1fdff'),
    gra('#9890e3','#b1f4cf'),
    gra('#ebc0fd','#d9ded8'),
    gra('#a8edea','#fed6e3'),
    gra('#5ee7df','#b490ca'),
    gra('#d299c2','#fef9d7'),
    gra('#ebbba7','#cfc7f8'),
    gra('#fff1eb','#ace0f9'),
    gra('#c471f5','#fa71cd'),
    gra('#48c6ef','#6f86d6'),
    gra('#feada6','#f5efef'),
    gra('#accbee','#e7f0fd'),
    gra('#fdfbfb','#ebedee'),
    gra('#4facfe','#00f2fe'),
    gra('#ff9a9e','#fecfef'),
    gra('#fbc2eb','#a6c1ee'),
    gra('#43e97b','#38f9d7'),
    gra('#9795f0','#fbc8d4'),
    gra('#a7a6cb','#8989ba'),
    gra('#88d3ce','#6e45e2'),
    gra('#d9afd9','#97d9e1'),
    gra('#7028e4','#e5b2ca'),
    gra('#13547a','#80d0c7'),
    gra('#93a5cf','#e4efe9'),
    gra('#93a5cf','#e4efe9'),
    gra('#92fe9d','#00c9ff'),
    gra('#c1dfc4','#deecdd'),
    gra('#0ba360','#3cba92'),
    gra('#00c6fb','#005bea'),
    gra('#74ebd5','#9face6'),
    gra('#6a85b6','#bac8e0'),
    gra('#a3bded','#6991c7'),
    gra('#96fbc4','#f9f586'),
    gra('#2af598','#009efd'),
    gra('#abecd6','#fbed96'),
    gra('#5f72bd','#9b23ea'),
    gra('#ddd6f3','#faaca8'),
    gra('#dcb0ed','#99c99c'),
    gra('#c71d6f','#d09693'),
    gra('#96deda','#50c9c3'),
    gra('#f77062','#fe5196'),
    gra('#20E2D7','#F9FEA5'),
    gra('#A8BFFF','#884D80'),
    gra('#B6CEE8','#F578DC'),
    gra('#FFFEFF','#D7FFFE'),
    gra('#E3FDF5','#FFE6FA'),
    gra('#7DE2FC','#B9B6E5'),
    gra('#CBBACC','#2580B3'),
    gra('#B7F8DB','#50A7C2'),
    gra('#29323c','#485563'),
    gra('#cd9cf2','#f6f3ff'),
    gra('#6a11cb','#2575fc'),
    gra('#37ecba','#72afd3'),
    gra('#f093fb','#f5576c'),
    gra('#ff758c','#ff7eb3'),
    gra('#868f96','#596164'),
    gra('#c79081','#dfa579'),
    gra('#8baaaa','#ae8b9c'),
    gra('#b721ff','#21d4fd'),
    gra('#874da2','#c43a30'),
    gra('#4481eb','#04befe'),
    gra('#f794a4','#fdd6bd'),
    gra('#64b3f4','#c2e59c'),
    gra('#0fd850','#f9f047'),
    gra('#ee9ca7','#ffdde1'),
    gra('#209cff','#68e0cf'),
    gra('#e6b980','#eacda3'),
    gra('#1e3c72','#2a5298'),
    gra('#9be15d','#00e3ae'),
    gra('#6e45e2','#88d3ce'),
    gra('#16a085','#f4d03f'),
    gra('#ff5858','#f09819'),
    gra('#00cdac','#8ddad5'),
    gra('#4481eb','#04befe'),
    gra('#ed6ea0','#ec8c69'),
    gra('#ffc3a0','#ffafbd'),
    gra('#cc208e','#6713d2'),
    gra('#b3ffab','#12fff7'),
    gra('#243949','#517fa4'),
    gra('#fc6076','#ff9a44'),
    gra('#00dbde','#fc00ff'),
    gra('#0acffe','#495aff'),
    gra('#616161','#9bc5c3'),
    gra('#d7d2cc','#304352'),
    gra('#e14fad','#f9d423'),
    gra('#ec77ab','#7873f5'),
    gra('#007adf','#00ecbc'),
];

colorList=colorList.filter(a=>(color(a.midColor).luminosity()<0.5));
colorList.sort((a,b)=>color(a.midColor).hue()-color(b.midColor).hue());
console.log(colorList.length);

function *colorGenerator(offset=25,step=11) {
    let h=offset;
    while (true){
        yield colorList[(h+=step)%colorList.length];
    }

}

class ColorHelper {
    constructor(...args){
        this.generator=colorGenerator(...args);
    }
    get(key) {
        if(!window.colorMap)window.colorMap={};
        if(window.colorMap[key])return window.colorMap[key];
        return window.colorMap[key]=this.generator.next().value;
    };
}

export default ColorHelper;