const items=[['角色資料','characters.html'],['世界觀','world.html'],['關係','relationships.html'],['劇情','story.html'],['設定集','settings.html'],['資料庫','database.html'],['其他','other.html']];
const login=document.querySelector('#login'),loginCircle=document.querySelector('#loginCircle'),menu=document.querySelector('#menu'),nodes=document.querySelector('#nodes'),center=document.querySelector('#center'),title=document.querySelector('#selectedTitle'),go=document.querySelector('#go');
let selected=0,rotation=0,started=false;
items.forEach((item,i)=>{const b=document.createElement('button');b.className='node';b.type='button';b.innerHTML='<span class="node-content"><span class="node-art">◌</span><span class="node-label"></span></span>';b.querySelector('.node-label').textContent=item[0];b.addEventListener('click',()=>choose(i));nodes.appendChild(b)});
function render(){const els=[...document.querySelectorAll('.node')],r=Math.min(nodes.clientWidth,nodes.clientHeight)*.39,step=360/items.length;els.forEach((el,i)=>{const a=(i*step-90)*Math.PI/180;el.style.transform=`translate(${Math.cos(a)*r}px,${Math.sin(a)*r}px)`;const content=el.querySelector('.node-content');content.style.transform=`rotate(${-rotation}deg)`});nodes.style.transform=`rotate(${rotation}deg)`;}
function choose(i){
  const step=360/items.length;
  const currentIndex=selected;
  let move=i-currentIndex;
  if(move>items.length/2) move-=items.length;
  if(move<-items.length/2) move+=items.length;
  selected=i;
  rotation-=move*step;
  title.textContent=items[i][0];
  document.querySelectorAll('.node').forEach((n,k)=>n.classList.toggle('selected',k===i));
  render();
  center.classList.add('visible');
}
loginCircle.addEventListener('click',()=>{if(started)return;started=true;loginCircle.classList.add('entering');setTimeout(()=>{login.classList.add('hidden');menu.classList.remove('hidden');render();setTimeout(()=>choose(0),180)},650)});
go.addEventListener('click',()=>window.location.href=items[selected][1]);
window.addEventListener('keydown',e=>{if(!started)return;if(e.key==='ArrowLeft')choose((selected-1+items.length)%items.length);if(e.key==='ArrowRight')choose((selected+1)%items.length)});window.addEventListener('resize',render);
