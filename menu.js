// Cardápio padrão, adicionais e funções comuns (usado pelo app da loja e pelo link do cliente)
const DEF=[
 {id:'trad',nome:'Tradicionais',itens:[['p1','Carne',13,1],['p2','Calabresa',13,2],['p3','Frango',13,3],['p4','Queijo',13,4]]},
 {id:'carne',nome:'Especiais de carne',itens:[['p5','Carne com queijo',15,5],['p6','Carne com azeitona',15,6],['p7','Carne, milho e ervilha',15,7],['p8','Carne com cheddar',15,8],['p9','Carne com catupiry',15,9]]},
 {id:'frango',nome:'Especiais de frango',itens:[['p10','Frango com catupiry',15,10],['p11','Frango com bacon',15,11],['p12','Frango com queijo',15,12],['p13','Frango com calabresa',15,13],['p14','Frango com cheddar',15,14]]},
 {id:'cala',nome:'Calabresa',itens:[['p15','Calabresa com bacon',15,15],['p16','Calabresa com queijo',15,16],['p17','Calabresa com cheddar',15,17],['p18','Calabresa com catupiry',15,18]]},
 {id:'esp',nome:'Especiais',itens:[['p19','Hot dog',15,19,'Salsicha, maionese, ketchup, mostarda, queijo, tomate e batata palha'],['p20','Pizza',15,20,'Presunto, queijo, azeitona, tomate e orégano'],['p21','Presunto e queijo',15,21],['p22','Carne, queijo e azeitona',16,22],['p23','3 queijos',18,23,'Mussarela, catupiry e cheddar']]},
 {id:'casa',nome:'Especial da casa',tag:'25 cm',itens:[['ml','Muito Louco 25 cm',25,0,'Carne, calabresa, frango, azeitona, milho, ervilha, queijo, cheddar ou catupiry',['Cheddar','Catupiry']]]},
 {id:'cost',nome:'Costela desfiada',tag:'Novidade',img:'cost',itens:[['c1','Costela',17],['c2','Costela com queijo',20],['c3','Costela catupiry',20],['c4','Costela cheddar',20]]},
 {id:'doce',nome:'Pastéis doces',itens:[['d1','Chocolate preto',12,0,0,0,'dc1'],['d2','Chocolate branco',12,0,0,0,'dc2'],['d3','Doce de leite',12,0,0,0,'dc3'],['d4','Beijinho',13,0,0,0,'dc4'],['d5','2 Amores',13,0,0,0,'dc5'],['d6','Creme de avelã (Nutella)',15,0,0,0,'dc6']]},
 {id:'bat',nome:'Porções de batata frita',tag:'500 g',itens:[['b1','Batata tradicional',25,0,0,0,'bt1'],['b2','Batata com cheddar',30,0,0,0,'bt2'],['b3','Batata com queijo',30,0,0,0,'bt3'],['b4','Batata cheddar e bacon',35,0,0,0,'bt4'],['b5','Batata com queijo e bacon',35,0,0,0,'bt5']]},
 {id:'beb',nome:'Bebidas sem álcool',bev:1,itens:[['r1','Coca-Cola 2 L',15],['r2','Coca-Cola 1 L',10],['r3','Fanta 2 L',15],['r4','Refrigerante 2 L (Guaraná)',8],['r5','Coca-Cola lata 350 ml',6],['r6','Fanta lata 350 ml',6],['r7','Sprite lata 350 ml',6],['r8','Frupic 450 ml',5],['r9','Garrafinha de água',3]]},
 {id:'alc',nome:'Bebidas com álcool',bev:1,warn:'Se beber, não dirija!',itens:[['a1','Império',5],['a2','Skol',5],['a3','Brahma',5],['a4','Amstel',5],['a5','Askov',8.5]]}
];
const TIPOS=['Pastéis salgados','Pastéis doces','Porções','Bebidas','Outros'];
const DEF_TIPO={trad:0,carne:0,frango:0,cala:0,esp:0,casa:0,cost:0,doce:1,bat:2,beb:3,alc:3};
function defaultMenu(){return DEF.map(c=>({id:c.id,nome:c.nome,tag:c.tag||'',warn:c.warn||'',img:c.img||'',bev:!!c.bev,tipo:TIPOS[DEF_TIPO[c.id]]||'Outros',itens:c.itens.map(a=>({id:a[0],n:a[1],p:a[2],num:a[3]||0,d:a[4]||'',opts:a[5]||null,img:a[6]||'',off:false}))}))}
let MENU=[],ITEM={},menuJson=null;
const DEF_ADIC=[{n:'Queijo',p:5},{n:'Cheddar',p:5},{n:'Catupiry',p:5},{n:'Azeitona',p:3},{n:'Milho',p:2},{n:'Ervilha',p:2}];let ADIC=DEF_ADIC.map(a=>({...a}));
function setMenu(data){const cats=Array.isArray(data)?data:data.cats;ADIC=(!Array.isArray(data)&&Array.isArray(data.adicionais))?data.adicionais:DEF_ADIC.map(a=>({...a}));
 cats.forEach(c=>{if(c.adic===undefined)c.adic=(c.tipo==='Pastéis salgados')});MENU=cats;ITEM={};MENU.forEach(c=>c.itens.forEach(it=>{ITEM[it.id]={...it,cat:c.id,catNome:c.nome,tipo:c.tipo||'Outros',bev:!!c.bev,adic:!!c.adic}}))}
const adSum=a=>(a||[]).reduce((t,x)=>t+x.p,0),adKey=a=>(a||[]).map(x=>x.n).sort().join(','),adTxt=a=>(a&&a.length)?'+ '+a.map(x=>x.n).join(', '):'';
const linePrice=c=>(ITEM[c.id]?ITEM[c.id].p:0)+adSum(c.ad);
const isBev=i=>i.b!==undefined?!!i.b:!!(ITEM[i.id]&&ITEM[i.id].bev);
/* ---------- horário de funcionamento (loja online) ---------- */
const DIAS=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const DEF_HORARIO={sem:[{on:true,a:'17:00',f:'22:00'},{on:false,a:'18:00',f:'23:00'},{on:true,a:'18:00',f:'23:00'},{on:true,a:'18:00',f:'23:00'},{on:true,a:'18:00',f:'23:00'},{on:true,a:'18:00',f:'23:59'},{on:true,a:'18:00',f:'23:59'}],fechados:[],pausa:false,msgPausa:''};
const TAXA_ENTREGA=5;
const _p2=n=>String(n).padStart(2,'0');
const ymdL=d=>d.getFullYear()+'-'+_p2(d.getMonth()+1)+'-'+_p2(d.getDate());
const minDe=hhmm=>{const[h,m]=String(hhmm||'0:0').split(':').map(Number);return h*60+(m||0)};
const horaTxt=hhmm=>{const[h,m]=String(hhmm).split(':');return(+h)+'h'+(m&&m!=='00'?m:'')};
function lojaStatus(H,agora){H=H||DEF_HORARIO;const now=agora||new Date(),t=now.getHours()*60+now.getMinutes();
 const fechadoEm=d=>(H.fechados||[]).find(x=>x.d===ymdL(d));
 const turno=d=>{const s=H.sem[d.getDay()];return s&&s.on&&!fechadoEm(d)?s:null};
 let aberto=false,ate=null;
 const ont=new Date(now);ont.setDate(now.getDate()-1);const so=turno(ont);
 if(so&&minDe(so.f)<=minDe(so.a)&&t<minDe(so.f)){aberto=true;ate=so.f}
 const sh=turno(now);
 if(!aberto&&sh){const a=minDe(sh.a),f=minDe(sh.f);if(t>=a&&(f>a?t<f:true)){aberto=true;ate=sh.f}}
 const hoje=fechadoEm(now);
 if(H.pausa)return{aberto:false,pausa:true,msg:H.msgPausa||'',prox:null,hoje};
 let prox=null;
 if(!aberto)for(let k=0;k<15&&!prox;k++){const d=new Date(now);d.setDate(now.getDate()+k);const s=turno(d);if(s&&(k>0||t<minDe(s.a)))prox={d,a:s.a,f:s.f,k}}
 return{aberto,ate,prox,hoje,msg:hoje&&hoje.msg||''};
}
function proxTxt(p){if(!p)return'em breve';const dia=p.k===0?'hoje':p.k===1?'amanhã':DIAS[p.d.getDay()].toLowerCase()+', '+_p2(p.d.getDate())+'/'+_p2(p.d.getMonth()+1);return dia+' às '+horaTxt(p.a)}
/* entrega indisponível (problema com entregador): {d:'AAAA-MM-DD' só nesse dia | 'sempre' até reativar, msg} */
function entregaOk(H,agora){const e=H&&H.semEntrega;if(!e||!e.d)return true;if(e.d==='sempre')return false;return e.d!==ymdL(agora||new Date())}
