window.onload=function(){
	function can_move(pn,x2,y2,asc){
		function get_d(x,y,x2,y2,b,c){
			var dr={x:x>x2?-1:1,y:y>y2?-1:1}
			while (true){
				x+=dr.x
				y+=dr.y
				if (x==x2&&y==y2){break}
				if (x<1||x>8||y<1||y>8||b[y-1][x-1].c!=null){return false}
			}
			return true
		}
		function get_h(x,y,x2,y2,b,c){
			var dr={x:x==x2?0:(x>x2?-1:1),y:y==y2?0:(y>y2?-1:1)}
			if (dr.x!=0&&dr.y!=0){return false}
			while (true){
				x+=dr.x
				y+=dr.y
				if (x==x2&&y==y2){break}
				if (x<1||x>8||y<1||y>8||b[y-1][x-1].c!=null){return false}
			}
			return true
		}
		function get_k(x,y,x2,y2,b,c,pn){
			function any_move(c,x2,y2){
				for (var p of pcs){
					if (p.classList.contains("king")&&p.classList.contains("nm")){continue}
					if (!p.classList.contains(c)&&can_move(p,x2-1,y2-1)>0){
						return true
					}
				}
				if (board[y2-1][x2-1].c!=null&&!(board[y2-1][x2-1].c==c&&board[y2-1][x2-1].p=="king")){
					return true
				}
				return false
			}
			for (var p of pcs){
				if (p.classList.contains("king")&&!p.classList.contains(c)){
					var d=Math.sqrt((x2-Math.floor(parseInt(p.style.left.substring(0,p.style.left.length-2))/60)-1)**2+(y2-Math.floor(parseInt(p.style.top.substring(0,p.style.top.length-2))/60)-1)**2)
					if (d<2){return false}
					break
				}
			}
			if (((b[y2-1][x2-1].c==c)||(Math.abs(x2-x)>1)||(Math.abs(y2-y)>1))&&!pn.classList.contains("nm")){return false}
			if (pn.classList.contains("nm")){
				for (var p of pcs){
					if (p.classList.contains("rook")&&p.classList.contains(c)&&p.classList.contains("nm")){
						if ((p.style.left=="0px"&&y2==y&&x2==3&&x==5&&!any_move(c,x2,y2)&&!any_move(c,x2+1,y2)&&!any_move(c,x,y2))||(p.style.left=="420px"&&y2==y&&x2==7&&x==5&&!any_move(c,x2,y2)&&!any_move(c,x2-1,y2)&&!any_move(c,x,y2))){
							return true
						}
					}
				}
				if (((b[y2-1][x2-1].c==c)||(Math.abs(x2-x)>1)||(Math.abs(y2-y)>1))){return false}
			}
			var b=Object.assign({},board[y2-1][x2-1]),b2=Object.assign({},board[y-1][x-1]),k=Object.assign([],KINGS[c])
			board[y2-1][x2-1]=Object.assign({},board[y-1][x-1])
			board[y-1][x-1]={c:null,p:null,r:null}
			KINGS[c]=[x2-1,y2-1]
			var s=e_king(...arguments)
			KINGS[c]=k
			board[y2-1][x2-1]=b
			board[y-1][x-1]=b2
			return !s
		}
		function get_kn(x,y,x2,y2,b,c){
			var a=[[-1,-2],[-1,2],[1,-2],[1,2],[-2,-1],[2,-1],[-2,1],[2,1]]
			for (var d of a){
				if (x+d[0]==x2&&y+d[1]==y2){
					return true
				}
			}
			return false
		}
		function get_p(x,y,x2,y2,b,c){
			if ((((x2!=x&&Math.abs(x2-x)==1&&board[y2-1][x2-1].c=={"black":"white","white":"black"}[c])||(x2==x&&board[y2-1][x2-1].c==null))&&y2+(c=="white"?1:-1)==y)||(x==x2&&((c=="white"&&y==7&&((y2==6&&b[5][x-1].c==null)||(y2==5&&b[5][x-1].c==null&&b[4][x-1].c==null)))||(c=="black"&&y==2&&((y2==3&&b[2][x-1].c==null)||(y2==4&&b[2][x-1].c==null&&b[3][x-1].c==null)))))){return true}
			return false
		}
		function e_king(x,y,x2,y2,b,c,pn,asc){
			for (var p of pcs){
				if (!p.classList.contains(c)&&can_move(p,...KINGS[c],asc+1)>0){
					var b=Object.assign({},board[y2-1][x2-1]),b2=Object.assign({},board[y-1][x-1]),k=Object.assign([],KINGS[c])
					board[y2-1][x2-1]=Object.assign({},board[y-1][x-1])
					board[y-1][x-1]={c:null,p:null,r:null}
					if (pn.classList.contains("king")){
						KINGS[c]=[x2-1,y2-1]
					}
					for (var p_ of pcs){
						if (p_==b.r||p_.classList.contains("king")){continue}
						if (!p_.classList.contains(c)&&can_move(p_,...KINGS[c])>0){
							KINGS[c]=k
							board[y2-1][x2-1]=b
							board[y-1][x-1]=b2
							return true
						}
					}
					KINGS[c]=k
					board[y2-1][x2-1]=b
					board[y-1][x-1]=b2
					return false
				}
			}
			return false
		}
		asc=asc||0
		var x=Math.floor(parseInt(pn.style.left.substring(0,pn.style.left.length-2))/60),y=Math.floor(parseInt(pn.style.top.substring(0,pn.style.top.length-2))/60)
		var c=board[y][x].c,c2=board[y2][x2].c
		var p=board[y][x].p
		x++;y++;x2++;y2++
		if (c==null){return -1}
		if ((c==c2)||(p=="queen"&&!get_d(x,y,x2,y2,board,c,pn,asc)&&!get_h(x,y,x2,y2,board,c,pn,asc))||(p=="bishop"&&!get_d(x,y,x2,y2,board,c,pn,asc))||(p=="rook"&&!get_h(x,y,x2,y2,board,c,pn,asc))||(p=="king"&&!get_k(x,y,x2,y2,board,c,pn,asc))||(p=="pawn"&&!get_p(x,y,x2,y2,board,c,pn,asc))||(p=="knight"&&!get_kn(x,y,x2,y2,board,c,pn,asc))||(asc<100&&e_king(x,y,x2,y2,board,c,pn,asc))){return 0}
		return board[y2-1][x2-1].c=={"black":"white","white":"black"}[c]?2:1
	}
	function calc_move(C){
		function all_moves(C){
			var m=[]
			for (var p of pcs){
				if (p.classList.contains(C)){
					for (var x=0;x<8;x++){
						for (var y=0;y<8;y++){
							if (can_move(p,x,y)>0){
								m.push([Math.floor(parseInt(p.style.left.substring(0,p.style.left.length-2))/60),Math.floor(parseInt(p.style.top.substring(0,p.style.top.length-2))/60),x,y,p])
							}
						}
					}
				}
			}
			return m
		}
		function _move(x1,y1,x2,y2){
			board[y2][x2]=Object.assign({},board[y1][x1])
			board[y1][x1]={"c":null,"r":null,"p":null}
			if (board[y2][x2].p=="king"){
				KINGS[board[y2][x2].c]=[x2,y2]
			}
		}
		function copy(obj,t){
			if (t=="b"){
				var nb=[]
				for (var y=0;y<8;y++){
					nb.push([])
					for (var x=0;x<8;x++){
						nb[y].push(Object.assign(obj[y][x]))
					}
				}
				return nb
			}
			else{
				return {"white":Object.assign([],obj.white),"black":Object.assign([],obj.black)}
			}
		}
		function evalB(){
			function pv(p,x,y){
				if (p.c==null){
					return 0
				}
				var v=PSD[p.p]+MINMAX_DATA[p.c.substring(0,1).toUpperCase()+p.p][x][y]
				return p.c=="white"?v:-v
			}
			var ts=0
			for (var x=0;x<8;x++){
				for (var y=0;y<8;y++){
					ts+=pv(board[y][x],x,y)
				}
			}
			return ts
		}
		function minmax(dp,C,a,b,st){
			if (dp==0){
				return -evalB()
			}
			if (st){
				var bc=copy(board,"b"),kg=copy(KINGS,"k"),best=-9999
				for (var mv of all_moves(C)){
					_move(...mv)
					best=Math.max(best,minmax(dp-1,{"black":"white","white":"black"}[C],a,b,!st))
					board=copy(bc,"b")
					KINGS=copy(kg,"k")
					a=Math.max(a,best)
					if (b<=a){
						return best
					}
				}
				return best
			}
			else{
				var bc=copy(board,"b"),kg=copy(KINGS,"k"),best=9999
				for (var mv of all_moves(C)){
					_move(...mv)
					best=Math.min(best,minmax(dp-1,{"black":"white","white":"black"}[C],a,b,!st))
					board=copy(bc,"b")
					KINGS=copy(kg,"k")
					b=Math.min(b,best)
					if (b<=a){
						return best
					}
				}
				return best
			}
		}
		var DEPTH=2
		var m=all_moves(C)
		var bc=copy(board,"b"),kg=copy(KINGS,"k"),best=-9999,bMv=m[0]
		for (var mv of m){
			_move(...mv)
			var v=minmax(DEPTH-1,{"black":"white","white":"black"}[C],-10000,10000,true)
			board=copy(bc,"b")
			KINGS=copy(kg,"k")
			if (v>=best){
				best=v
				bMv=mv
			}
		}
		for (var p of pcs){
			if (p==bMv[4]){
				p.classList.add("hv")
				move(bMv[2],bMv[3])
				break
			}
		}
	}
	function f_click(){
		if (this.classList.contains("die")||PAUSE==true){return}
		if (this.classList.contains("hv")){
			this.classList.remove("hv")
			this.classList.add("nhv")
			for (var h of hbxs){
				h.classList.remove("d")
				h.classList.remove("o")
			}
			return
		}
		for (var p of pcs){
			p.classList.remove("hv")
			p.classList.add("nhv")
		}
		if (TURN==(this.classList.contains("white")?"white":"black")){
			this.classList.add("hv")
			this.classList.remove("nhv")
		}
		var c=false
		for (var h of hbxs){
			h.classList.remove("d")
			var v=can_move(this,Math.floor(parseInt(h.style.left.substring(0,h.style.left.length-2))/60),Math.floor(parseInt(h.style.top.substring(0,h.style.top.length-2))/60))
			if (TURN==(this.classList.contains("white")?"white":"black")&&v>0){
				h.classList.add("o")
				if (v==2){
					h.classList.add("d")
				}
				c=true
			}
			else{
				h.classList.remove("o")
			}
		}
		if (c==false){
			this.classList.remove("hv")
			this.classList.add("nhv")
		}
	}
	function check(t){
		function any_move(p){
			for (var x=0;x<8;x++){
				for (var y=0;y<8;y++){
					if (can_move(p,x,y)>0){
						return true
					}
				}
			}
			return false
		}
		var s=true
		for (var p of pcs){
			if (p.classList.contains(t)&&any_move(p)){
				s=false
				break
			}
		}
		if (s==false&&pcs.length==2&&pcs[0].classList.contains("king")&&pcs[1].classList.contains("king")){s=true}
		if (s==false&&POINTS[{"black":"white","white":"black"}[t]]>=1000){s=true}
		if (s){
			PAUSE=true
			for (var p of pcs){
				if (p.classList.contains(t)&&p.classList.contains("king")){
					p.classList.add("die")
					break
				}
			}
			setTimeout(function(){
				p.style.display="none"
				pr.classList.add("end")
				setTimeout(function(){pr.parentElement.removeChild(pr)},10000)
			},1499)
		}
	}
	function move(x2,y2){
		if (TURN!=null&&PAUSE==false){
			var l_t=TURN
			TURN=null
			var p=null
			for (var pc of pcs){
				if (pc.classList.contains("hv")){
					p=pc
					break
				}
			}
			var x=Math.floor(parseInt(p.style.left.substring(0,p.style.left.length-2))/60),y=Math.floor(parseInt(p.style.top.substring(0,p.style.top.length-2))/60)
			pr.childNodes[1].onclick()
			p.classList.add("mv")
			for (var pc of pr.childNodes){
				if (pc.classList&&!pc.classList.contains("mv")){
					pc.classList.add("back")
				}
			}
			p.style.top=`${y2*60}px`
			p.style.left=`${x2*60}px`
			p.classList.remove("nm")
			function f(p){
				p.classList.remove("mv")
				if (board[y2][x2].r!=null){
					board[y2][x2].r.classList.add("die")
				}
				for (var pc of pr.childNodes){
					if (pc.classList){pc.classList.remove("back")}
				}
				if (board[y2][x2].r!=null){
					POINTS[l_t]+=PSD[board[y2][x2].p]
					console.log("black: "+POINTS.black+"\twhite: "+POINTS.white)
					var e=Object.assign({},board[y2][x2]).r
					pcs.splice(pcs.indexOf(e),1)
					e.onclick=function(){}
					e.onmouseover=function(){}
					e.onmouseout=function(){}
					setTimeout(function(){
						e.classList.remove("die")
						e.classList.add("appear")
						if (e.classList.contains("white")){
							e.style.top=`${-OUT_ADD.black[1]*60-80}px`
							e.style.left=`${OUT_ADD.black[0]*60}px`
							OUT_ADD.black[0]++
							if (OUT_ADD.black[0]==8){
								OUT_ADD.black=[0,1]
							}
						}
						else{
							e.style.top=`${OUT_ADD.white[1]*60+500}px`
							e.style.left=`${OUT_ADD.white[0]*60}px`
							OUT_ADD.white[0]++
							if (OUT_ADD.white[0]==8){
								OUT_ADD.white=[0,1]
							}
						}
					},1500)
				}
				var b=Object.assign({},board[y][x])
				board[y2][x2]=Object.assign({},board[y][x])
				board[y][x]={"c":null,"p":null,"r":null}
				TURN={"black":"white","white":"black"}[l_t]
				pr.classList.remove(b.c)
				pr.classList.add({"black":"white","white":"black"}[b.c])
				if (b.p=="king"&&Math.abs(x2-x)==2){
					for (var p of pcs){
						if (p.classList.contains("rook")&&p.classList.contains(b.c)&&p.style.left==(x2>x?"420px":"0px")){
							p.classList.add("hv")
							p.classList.remove("nhv")
							move((x2>x?5:3),y)
							break
						}
					}
				}
				if (b.p=="king"){
					KINGS[b.c]=[x2,y2]
				}
				if (b.p=="pawn"&&((b.c=="white"&&b.r.style.top=="0px")||(b.c=="black"&&b.r.style.top=="420px"))){
					check(TURN)
					PAUSE=true
					var e=pr.childNodes[0]
					e.classList.remove("hide")
					for (var k of ["queen","rook","bishop","knight"]){
						var s=document.createElement("span")
						s.innerHTML=PD[b.c][k]
						s.style.color=b.c=="white"?"#ccc":"#555"
						s.onclick=function(){
							b.p=Object.keys(PD[b.c])[Object.values(PD[b.c]).indexOf(this.innerHTML)]
							b.r.classList.remove("pawn")
							b.r.classList.add(Object.keys(PD[b.c])[Object.values(PD[b.c]).indexOf(this.innerHTML)])
							b.r.innerHTML=this.innerHTML
							e.classList.add("hide")
							PAUSE=false
							if (TURN=="black"){setTimeout(function(){calc_move("black")},1)}
						}
						e.appendChild(s)
					}
				}
				else{
					check(TURN)
					if (PAUSE==false&&TURN=="black"){setTimeout(function(){calc_move("black")},1)}
				}
			}
			setTimeout(function(){f(p)},500)
		}
	}
	function m_over(){
		if (TURN!=(this.classList.contains("white")?"white":"black")||this.classList.contains("hv")||this.classList.contains("die")||PAUSE==true){return}
		for (var h of hbxs){
			if (can_move(this,Math.floor(parseInt(h.style.left.substring(0,h.style.left.length-2))/60),Math.floor(parseInt(h.style.top.substring(0,h.style.top.length-2))/60))>0){
				this.classList.add("mhv")
				return
			}
		}
	}
	function m_out(){
		this.classList.remove("mhv")
	}
	function create(){
		pr.classList.add("white")
		var e=document.createElement("div")
		e.classList.add("hide")
		e.classList.add("over")
		pr.appendChild(e)
		for (var x=0;x<8;x++){
			var r=document.createElement("span")
			r.classList.add("row")
			r.onclick=function(){
				for (var p of pcs){
					p.classList.remove("hv")
					p.classList.add("nhv")
				}
				for (var h of hbxs){
					h.classList.remove("d")
					h.classList.remove("o")
				}
			}
			pr.appendChild(r)
			board.push([])
			for (var y=0;y<8;y++){
				board[x].push({"c":null,"p":null,"r":null})
			}
		}
		for (var c of ["black","white"]){
			for (var x=0;x<8;x++){
				var r=document.createElement("span")
				r.classList.add("fig")
				r.classList.add(c)
				r.classList.add(Object.keys(PD[c])[x].replace("_",""))
				r.classList.add("nhv")
				r.classList.add("nm")
				r.style.left=`${x*60}px`
				r.style.top=`${c=="black"?0:420}px`
				r.style.transform=`scale(.8) rotate(${c=="black"?180:0}deg)`
				r.style.color=c=="white"?"#ccc":"#555"
				r.innerHTML=PD[c][Object.keys(PD[c])[x]]
				board[c=="black"?0:7][x].c=c
				board[c=="black"?0:7][x].p=Object.keys(PD[c])[x].replace("_","")
				board[c=="black"?0:7][x].r=r
				r.onclick=f_click
				r.onmouseover=m_over
				r.onmouseout=m_out
				pcs.push(r)
				pr.appendChild(r)
			}
			for (var x=0;x<8;x++){
				var r=document.createElement("span")
				r.classList.add("fig")
				r.classList.add(c)
				r.classList.add("pawn")
				r.classList.add("nhv")
				r.classList.add("nm")
				r.style.left=`${x*60}px`
				r.style.top=`${c=="black"?60:360}px`
				r.style.transform=`scale(.8) rotate(${c=="black"?180:0}deg)`
				r.style.color=c=="white"?"#ccc":"#555"
				r.innerHTML=PD[c].pawn
				board[c=="black"?1:6][x].c=c
				board[c=="black"?1:6][x].p="pawn"
				board[c=="black"?1:6][x].r=r
				r.onclick=f_click
				r.onmouseover=m_over
				r.onmouseout=m_out
				pr.appendChild(r)
				pcs.push(r)
			}
		}
		for (var x=0;x<64;x++){
			var h=document.createElement("div")
			h.classList.add("hitbox")
			h.style.top=`${Math.floor(x/8)*60}px`
			h.style.left=`${(x%8)*60}px`
			var s=document.createElement("span")
			s.onclick=function(){
				move(Math.floor(parseInt(this.parentNode.style.left.substring(0,this.parentNode.style.left.length-2))/60),Math.floor(parseInt(this.parentNode.style.top.substring(0,this.parentNode.style.top.length-2))/60))
			}
			h.onclick=function(){
				move(Math.floor(parseInt(this.style.left.substring(0,this.style.left.length-2))/60),Math.floor(parseInt(this.style.top.substring(0,this.style.top.length-2))/60))
			}
			hbxs.push(h)
			h.appendChild(s)
			pr.appendChild(h)
		}
	}
	var PD={"white":{"rook":"\u2656","knight":"\u2658","bishop":"\u2657","queen":"\u2655","king":"\u2654","bishop_":"\u2657","knight_":"\u2658","rook_":"\u2656","pawn":"\u2659"},"black":{"rook":"\u265C","knight":"\u265E","bishop":"\u265D","queen":"\u265B","king":"\u265A","bishop_":"\u265D","knight_":"\u265E","rook_":"\u265C","pawn":"\u265F"}},TURN="white",POINTS={"white":0,"black":0},PSD={"king":1000,"queen":9,"rook":5,"bishop":3,"knight":3,"pawn":1},OUT_ADD={"black":[0,0],"white":[0,0]},END=false,KINGS={"white":[4,7],"black":[4,0]},PAUSE=false,MINMAX_DATA={"Wking":[[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-2,-3,-3,-4,-4,-3,-3,-2],[-1,-2,-2,-2,-2,-2,-2,-1],[2,2,0,0,0,0,2,2],[2,3,1,0,0,1,3,2]],"Bking":[[2,3,1,0,0,1,3,2],[2,2,0,0,0,0,2,2],[-1,-2,-2,-2,-2,-2,-2,-1],[-2,-3,-3,-4,-4,-3,-3,-2],[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3],[-3,-4,-4,-5,-5,-4,-4,-3]],"Wqueen":[[-2,-1,-1,-0.5,-0.5,-1,-1,-2],[-1,0,0,0,0,0,0,-1],[-1,0,0.5,0.5,0.5,0.5,0,-1],[-0.5,0,0.5,0.5,0.5,0.5,0,-0.5],[0,0,0.5,0.5,0.5,0.5,0,-0.5],[-1,0.5,0.5,0.5,0.5,0.5,0,-1],[-1,0,0.5,0,0,0,0,-1],[-2,-1,-1,-0.5,-0.5,-1,-1,-2]],"Bqueen":[[-2,-1,-1,-0.5,-0.5,-1,-1,-2],[-1,0,0,0,0,0,0,-1],[-1,0,0.5,0.5,0.5,0.5,0,-1],[-0.5,0,0.5,0.5,0.5,0.5,0,-0.5],[0,0,0.5,0.5,0.5,0.5,0,-0.5],[-1,0.5,0.5,0.5,0.5,0.5,0,-1],[-1,0,0.5,0,0,0,0,-1],[-2,-1,-1,-0.5,-0.5,-1,-1,-2]],"Wrook":[[0,0,0,0,0,0,0,0],[0.5,1,1,1,1,1,1,0.5],[-0.5,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,-0.5],[0,0,0,0.5,0.5,0,0,0]],"Brook":[[0,0,0,0.5,0.5,0,0,0],[-0.5,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,-0.5],[-0.5,0,0,0,0,0,0,-0.5],[0.5,1,1,1,1,1,1,0.5],[0,0,0,0,0,0,0,0]],"Wbishop":[[-2,-1,-1,-1,-1,-1,-1,-2],[-1,0,0,0,0,0,0,-1],[-1,0,0.5,1,1,0.5,0,-1],[-1,0.5,0.5,1,1,0.5,0.5,-1],[-1,0,1,1,1,1,0,-1],[-1,1,1,1,1,1,1,-1],[-1,0.5,0,0,0,0,0.5,-1],[-2,-1,-1,-1,-1,-1,-1,-2]],"Bbishop":[[-2,-1,-1,-1,-1,-1,-1,-2],[-1,0.5,0,0,0,0,0.5,-1],[-1,1,1,1,1,1,1,-1],[-1,0,1,1,1,1,0,-1],[-1,0.5,0.5,1,1,0.5,0.5,-1],[-1,0,0.5,1,1,0.5,0,-1],[-1,0,0,0,0,0,0,-1],[-2,-1,-1,-1,-1,-1,-1,-2]],"Wknight":[[-5,-4,-3,-3,-3,-3,-4,-5],[-4,-2,0,0,0,0,-2,-4],[-3,0,1,1.5,1.5,1,0,-3],[-3,0.5,1.5,2,2,1.5,0.5,-3],[-3,0,1.5,2,2,1.5,0,-3],[-3,0.5,1,1.5,1.5,1,0.5,-3],[-4,-2,0,0.5,0.5,0,-2,-4],[-5,-4,-3,-3,-3,-3,-4,-5]],"Bknight":[[-5,-4,-3,-3,-3,-3,-4,-5],[-4,-2,0,0.5,0.5,0,-2,-4],[-3,0.5,1,1.5,1.5,1,0.5,-3],[-3,0,1.5,2,2,1.5,0,-3],[-3,0.5,1.5,2,2,1.5,0.5,-3],[-3,0,1,1.5,1.5,1,0,-3],[-4,-2,0,0,0,0,-2,-4],[-5,-4,-3,-3,-3,-3,-4,-5]],"Wpawn":[[0,0,0,0,0,0,0,0],[5,5,5,5,5,5,5,5],[1,1,2,3,3,2,1,1],[0.5,0.5,1,2.5,2.5,1,0.5,0.5],[0,0,0,2,2,0,0,0],[0.5,-0.5,-1,0,0,-1,-0.5,0.5],[0.5,1,1,-2,-2,1,1,0.5],[0,0,0,0,0,0,0,0]],"Bpawn":[[0,0,0,0,0,0,0,0],[0.5,1,1,-2,-2,1,1,0.5],[0.5,-0.5,-1,0,0,-1,-0.5,0.5],[0,0,0,2,2,0,0,0],[0.5,0.5,1,2.5,2.5,1,0.5,0.5],[1,1,2,3,3,2,1,1],[5,5,5,5,5,5,5,5],[0,0,0,0,0,0,0,0]]}
	var pr=document.getElementsByClassName("board")[0]
	var board=[],pcs=[],hbxs=[]
	create()
}
