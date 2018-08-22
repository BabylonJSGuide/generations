function person(name, bday, dday, mum, dad) {
	this.name = name || null;
	this.bday = bday || null;
	this.dday = dday || null;
	this.mum = mum || null;
	this.dad = dad || null;
}

function $(id) {
	return document.getElementById(id);
}

function createChart(siblings) {
	var elm = document.body.firstChild;
	clearSiblings(elm);
	$('photographs').innerHTML='';
	$('h').style.backgroundColor='#DDDDDD';
	$('w').style.backgroundColor='#DDDDDD';
	$('h').removeEventListener('click', openHusbandFamily, false);
	$('w').removeEventListener('click', openWifeFamily, false);
	$('h').style.cursor = 'default';
	$('w').style.cursor = 'default';
	if (siblings.length * 250 > 1200) {
		var fulllength = siblings.length * 250;
		var midleft = Math.ceil(fulllength / 2)+80;
	} else {
		var fulllength = 1200;
		var midleft = 600;
	}
	var hleft = midleft - 258;
	var wleft = midleft + 8;
	var mleft = midleft - 3;
	$('h').style.left = hleft + 'px';
	$('w').style.left = wleft + 'px';
	$('m').style.left = mleft + 'px';
	$('s').style.left = midleft + 'px';
	var father = siblings[0].dad;
	var hHTML = father.name + '<br> ';
	if (father.bday != null) {
		hHTML += 'b ' + father.bday + '<br> <br>'
	};
	if (father.dday != null) {
		hHTML += 'd ' + father.dday;
	};
	if(father.pictures) {
		insertPhoto(father);
	}
	$('h').innerHTML = hHTML;
	if (father.mum != null) {
		$('h').addEventListener('click', openHusbandFamily, false);
		$('h').style.cursor = 'pointer';
		$('h').style.backgroundColor='#FFFFFF';
	}
	var mother = siblings[0].mum;
	var wHTML = mother.name + '<br> ';
	if (mother.bday != null) {
		wHTML += 'b ' + mother.bday + '<br>'
	};
	if (mother.wed != null) {
		wHTML += 'm ' + mother.wed;
	};
	wHTML += '<br>';
	if (mother.dday != null) {
		wHTML += 'd ' + mother.dday;
	};
	if(mother.pictures) {
		insertPhoto(mother);
	}
	$('w').innerHTML = wHTML;
	if (mother.mum != null) {
		$('w').addEventListener('click', openWifeFamily, false);
		$('w').style.cursor = 'pointer';
		$('w').style.backgroundColor='#FFFFFF';
	}
	sib = [];
	sibline = [];
	if (siblings.length == 1) {
		$('l').style.width = '0px';
		sibline[0] = document.createElement('div');
		sibline[0].id = 'sbln0';
		sibline[0].className = 'sibln';
		sibline[0].left = midleft;
		sibline[0].style.left = midleft + 'px';
		document.body.appendChild(sibline[0]);
	} else {//at least 2 siblings
		var lwidth = siblings.length * 250;
		var lleft = 80+(fulllength - lwidth) / 2;
		$('l').style.width = lwidth + 'px';
		$('l').style.left = lleft + 'px';
		var gap = lwidth / (siblings.length - 1);
		for (var i = 0; i < siblings.length; i++) {
			sibline[i] = document.createElement('div');
			sibline[i].id = 'sbln' + i;
			sibline[i].className = 'sibln';
			sibline[i].left = lleft + gap * i;
			sibline[i].style.left = sibline[i].left + 'px';
			document.body.appendChild(sibline[i]);
		}
	}
	var sib = [];
	var sHTML;
	for (var i = 0; i < siblings.length; i++) {
		sib[i] = document.createElement('div');
		sib[i].style.backgroundColor='#DDDDDD';
		sib[i].id = 'sb' + i;
		sib[i].className = 'sib';
		sib[i].style.left = (sibline[i].left - 50) + 'px';
		sHTML = siblings[i].name + '<br>';
		if (siblings[i].bday != null) {
			sHTML += 'b ' + siblings[i].bday
		};
		sHTML += '<br>';
		if (siblings[i].dday != null) {
			sHTML += 'd ' + siblings[i].dday;
		};
		sib[i].innerHTML = sHTML;
		if(siblings[i].children) {
			sib[i].addEventListener('click', function() {openFamily(this.id)},false);
			sib[i].style.cursor='pointer';
			sib[i].style.backgroundColor='#FFFFFF';
		}
		document.body.appendChild(sib[i]);
	}

	function openHusbandFamily() {
		createChart(father.parentsChildren);
	}

	function openWifeFamily() {
		createChart(mother.parentsChildren);
	}
	
	function openFamily(id) {
		var n=parseInt(id.substr(2));
		createChart(siblings[n].children);
	}

}

function clearSiblings(elm) {
	if (elm) {
		var nxt = elm.nextSibling;
		if (elm.nodeName == "DIV" && elm.id.substr(0, 2) == 'sb') {
			elm.parentNode.removeChild(elm);
		}
		clearSiblings(nxt);
	}
}

function insertPhoto(person) {
	for(var i=0;i<person.pictures.length;i++) {
			frame=document.createElement('div');
			frame.className='frame';
			image=new Image();
			image.src='images/'+person.pictures[i].source+'.jpg';
			ilabel=document.createElement('div');
			ilabel.innerHTML=person.pictures[i].label;
			frame.appendChild(image);
			frame.appendChild(ilabel);
			$('photographs').appendChild(frame);
		}
}

