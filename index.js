var sendElement = document.createElement('center');
var smallSend = document.createElement('div');
var animationS = document.createElement('center');
var form = document.createElement('form');
var maxForm = document.createElement('form');
var img = document.createElement('div');
var boxes = document.createElement('div');
var smallBtn = document.createElement('div');
var attachWindow = document.createElement('div');
var formHeight, formWidth, heightInput, attach = false;
var elements, elemOK, sendDocs, standartWidth, standartHeight;
var outWidth, outHeight;
var checkBoxList = document.createElement('div');
var select = false;
var formIndex, name="", mail="";
var countOfItems = 0;

var firstStep = document.createElement('div'),
	secondStep = document.createElement('div'),
	thirdStep = document.createElement('div');

function getValue(str)
{
	if (document.getElementsByTagName("html")[0].getAttribute("lang") == "ru-ru") { return str.split('~')[0]; }
	else { return str.split('~')[1]; }
}
	
function FindFile() { document.getElementById('my_hidden_file').value=""; document.getElementById('my_hidden_file').click(); }  
function LoadFile() { document.getElementById('my_hidden_load').click(); }  

function onResponse(d) // Функция обработки ответа от сервера 
{
if (countOfItems<3) {	
 eval('var obj = ' + d + ';');  
 if(obj.success!=1)
   {
    alert(getValue("Ошибка!\nФайл ~Error!\nFile ") + obj.filename + getValue(" не загружен - ~ not loaded - ")+obj.myres); 
    return; 
   };
   checkBoxList.innerHTML += '<div><input type="checkbox" id="' + obj.filename + '" checked onclick="javascript:changeSelect()" value="' + obj.filepath +'" class="chk">' + obj.filename + '</div>';
   countOfItems++;
   if (countOfItems>2) { document.getElementById('attachUpload').style.display = "none";}
   changeSelect();
}else{ alert(getValue("Количество файлов превышено!~The number of files exceeded!")); }
}

var minimize = false;

		function windowState() {
			if (minimize)
			{
				form.style.top = (window.innerHeight - 22) + "px";
				document.body.removeChild(img);
				if (!attach) {
					form.removeChild(boxes);
				}
				else {
					form.removeChild(attachWindow);
				}
				form.style.height = "22px";
				select = false;
				minimize = false;
			}
			else
			{
				form.style.top =  (window.innerHeight - (formHeight) - 20) + "px";
				document.body.appendChild(img);
				if (!attach) {
					form.appendChild(boxes);
				}
				else {
					form.appendChild(attachWindow);
				}
				img.style.top = (window.innerHeight - (formHeight) - 22) + "px";
				img.style.left = (window.innerWidth - (formWidth) - 50) - 26 + "px";
				form.style.height = formHeight + "px";
				minimize = true;
			}
		}
		
		function maximize()
		{
			if (!minimize)
			{
				document.body.style.position = "fixed";
				document.body.appendChild(maxForm);
				document.body.removeChild(smallBtn);
				//boxes.appendChild(smallSend);
				/*if (!attach)
				{
					document.getElementById('inputText').style.width = window.innerWidth - 100 + "px";
				}*/
				//smallSend.style.top = heightInput + "px";
				//smallSend.style.left = (window.innerWidth - (55) - 20) + "px";
				//smallSend.style.width = (55) + "px";
				//smallSend.style.height = (55) + "px";
				minimize = true;
			}
			else
			{
				document.body.removeChild(maxForm);
				document.body.appendChild(smallBtn);
				document.body.style.position = "inherit";
				minimize = false;
			}
		}
		
		function checkSizeOfData(str) {
            var res = 0, afterSymb = -1;
            for(i=0; i < str.length; i++){
				if (afterSymb > -1) { afterSymb++; }
                if(str.charAt(i) == '@'){
					afterSymb = 0;
                    res++;
					if (res > 1) { return false; }
                }
				else if (afterSymb > -1 && str.charAt(i) == '.') {
					if (afterSymb > 8) { return false; }
					if (str.length - i - 1 > 5) { return false; } 
					afterSymb = 0;
				}
            }
			if (res == 0) { return false; }
			
			return true;
		}
		
		function filter_input(e,regexp)
		{
		  e=e || window.event;
		  var target=e.target || e.srcElement;
		  var isIE=document.all;

		  if (target.tagName.toUpperCase()=='INPUT')
		  {
			var code=isIE ? e.keyCode : e.which;
			if (code<32 || e.ctrlKey || e.altKey) return true;

			var char=String.fromCharCode(code);
			if (!regexp.test(char)) return false;
		  }
		  return true;
		}
		
		function send() {
			if (formWidth == formHeight) {
				if (document.getElementById('inputText').value == ""
				|| name == ""
				|| mail == "") {
					alert(getValue("Не все поля были введены!~Not all fields have been entered!"));
				}
				else if (!checkSizeOfData(mail)) {
					alert(getValue("Неверный email!~Invalid email!"));
				}
				else {
					var sc=document.createElement("SCRIPT");
					sc.src="/floatModule/mail.php?email="+mail+"&name="+name+"&message="+document.getElementById('inputText').value + "&files=" + sendDocs;
					document.body.appendChild(sc);
					
					maxForm.style.height = "120px";
					
					delete(sc);
					
					checkBoxList.innerHTML ='';
					
					document.getElementById('inputText').value = "";
					document.getElementById('title').innerHTML=getValue("Задать вопросы юристу~Ask the lawyer questions");
					document.getElementById('imgAttach').src = "/floatModule/images/attach.png";
					
					if (formWidth != formHeight) {animationS.style.cssText = 'width: 100%'; form.appendChild(animationS); form.removeChild(boxes);}
					else { animationS.style.cssText = 'position: fixed; left: 0px; top: 0px; height: 100%; width: 100%;'; maxForm.removeChild(thirdStep); maxForm.appendChild(firstStep); maximize(); document.body.appendChild(animationS); }
					animationS.style.top = (window.innerHeight / 2) + "px";
					setTimeout(function() {
						if (formWidth == formHeight) { document.body.removeChild(animationS); }
						else { form.removeChild(animationS); form.appendChild(boxes); windowState(); }
					}, 1600);
				}
			}
			else 
			{
				if (document.getElementById('inputText').value == ""
				|| document.getElementById('Name').value == ""
				|| document.getElementById('Email').value == "") {
					alert(getValue("Не все поля были введены!~Not all fields have been entered!"));
				}
				else if (!checkSizeOfData(document.getElementById('Email').value)) {
					alert(getValue("Неверный email!~Invalid email!"));
				}
				else {
					var sc=document.createElement("SCRIPT");
					sc.src="/floatModule/mail.php?email="+document.getElementById('Email').value+"&name="+document.getElementById('Name').value+"&message="+document.getElementById('inputText').value + "&files=" + sendDocs;
					document.body.appendChild(sc);
					
					delete(sc);
					
					checkBoxList.innerHTML ='';
					
					document.getElementById('inputText').value = "";
					document.getElementById('Name').value = "";
					document.getElementById('Email').value = "";
					
					document.getElementById('imgAttach').src = "/floatModule/images/attach.png";
					
					if (formWidth != formHeight) {animationS.style.cssText = 'width: 100%'; form.appendChild(animationS); form.removeChild(boxes);}
					else { animationS.style.cssText = 'position: fixed; left: 0px; top: 0px; height: 100%; width: 100%;'; maxForm.removeChild(thirdStep); maxForm.appendChild(firstStep); maximize(); document.body.appendChild(animationS); }
					animationS.style.top = (window.innerHeight / 2) + "px";
					setTimeout(function() {
						if (formWidth == formHeight) { document.body.removeChild(animationS); }
						else { form.removeChild(animationS); form.appendChild(boxes); windowState(); }
					}, 1600);
				}
			}
		}
		
		function attachShowHide()
		{
			if (!attach)
			{
				if (formWidth == formHeight) {
					//maxForm.removeChild(boxes); 
					if (document.getElementById('title').innerHTML==getValue("Шаг 2 из 3~Step 2 of 3")) {maxForm.removeChild(secondStep); formIndex = 1;}
					else if (document.getElementById('title').innerHTML==getValue("Задать вопросы юристу~Ask the lawyer questions")) {maxForm.removeChild(firstStep); formIndex=0;}
					else { maxForm.removeChild(thirdStep); formIndex=2; }
					document.getElementById('title').innerHTML=getValue("Прикрепление файла~Attachment file");
					maxForm.appendChild(attachWindow);
					maxForm.style.height = "250px";
				}
				else { 
					form.removeChild(boxes); 
					form.appendChild(attachWindow);
				}
				
				attach = true;
			}
			else
			{
				elemOK = false;
				sendDocs = "";
				elements = document.getElementsByClassName("chk");
			
				Array.prototype.forEach.call(elements, function(el) {
					if (el.checked) { sendDocs += el.value + "~"; elemOK = true; }
				});
				
				if (formWidth == formHeight) { maxForm.removeChild(attachWindow); 
					maxForm.style.height = "160px";
					if (formIndex == 1) {maxForm.appendChild(secondStep); document.getElementById('title').innerHTML=getValue("Шаг 2 из 3~Step 2 of 3");}
					else if (formIndex==0) {maxForm.appendChild(firstStep); document.getElementById('title').innerHTML=getValue("Задать вопросы юристу~Ask the lawyer questions");}
					else {maxForm.appendChild(thirdStep); document.getElementById('title').innerHTML=getValue("Шаг 3 из 3~Step 3 of 3");}
				}
				else { form.removeChild(attachWindow); form.appendChild(boxes);}
				
				if(elemOK){
					document.getElementById('imgAttach').src = "/floatModule/images/attachAdd.png";
				}else{
					document.getElementById('imgAttach').src = "/floatModule/images/attach.png";
				}
				
				attach = false;
			}
		}
		
		window.addEventListener("orientationchange", function() {
			if (document.activeElement == "[object HTMLTextAreaElement]" || document.activeElement == "[object HTMLInputElement]") {
					if (formWidth != formHeight) {
						//form.style.top = (window.innerHeight - (formHeight) - 20) + "px";
						//form.style.left = (window.innerWidth - (formWidth) - 50) + "px";
						//img.style.top = (window.innerHeight - (formHeight) - 22) + "px";
						//img.style.left = (window.innerWidth - (formWidth) - 50) - 26 + "px";
					} else {
						maxForm.style.width = window.innerWidth; 
						//maxForm.style.top = (window.innerHeight / 2) - 120 + "px";
						}
			}
		}, false);
		
		window.onresize = function(e){
			if (document.activeElement == "[object HTMLTextAreaElement]" || document.activeElement == "[object HTMLInputElement]") {
				maxForm.style.top = (window.innerHeight / 2) - 60 + "px";
				maxForm.style.width = window.innerWidth;
				form.style.top = (window.innerHeight - (formHeight) - 20) + "px";
				form.style.left = (window.innerWidth - (formWidth) - 50) + "px";
				img.style.top = (window.innerHeight - (formHeight) - 22) + "px";
				img.style.left = (window.innerWidth - (formWidth) - 50) - 26 + "px";
			}
			else {
				standartHeight = window.innerHeight,
					standartWidth = window.innerWidth;
				if (minimize)
				{	
					if (formWidth != formHeight)
					{
						form.style.top = (window.innerHeight - (formHeight) - 20) + "px";
						form.style.left = (window.innerWidth - (formWidth) - 50) + "px";
						img.style.top = (window.innerHeight - (formHeight) - 22) + "px";
						img.style.left = (window.innerWidth - (formWidth) - 50) - 26 + "px";
					} else {
					//if (window.innerWidth <= 320) {smallBtn.style.top = (window.innerHeight - 60) + "px"; smallBtn.style.left = (width - 70) + "px";}
					//else if (window.innerWidth <= 375) {smallBtn.style.top = (window.innerHeight - 60) + "px"; smallBtn.style.left = (width - 70) + "px";}
					//else { smallBtn.style.top = (window.innerHeight - 70) + "px"; smallBtn.style.left = (width - 80) + "px"; }
					//smallSend.style.top = heightInput + "px";
					//smallSend.style.left = (window.innerWidth - (55) - 20) + "px";
					//smallSend.style.width = (55) + "px";
					//smallSend.style.height = (55) + "px";
					//document.getElementById('inputText').style.width = window.innerWidth - 100 + "px";
					if (maxForm.style.height == "120px") {maxForm.style.top = (window.innerHeight / 2) - 60 + "px";}
					else {maxForm.style.top = (window.innerHeight / 2) - 65 + "px";}
					}
				}
				else
				{
					if (formWidth != formHeight) {
						form.style.top = (window.innerHeight - 22) + "px"; 
						form.style.left = (window.innerWidth - (formWidth) - 50) + "px"; }
					else {
						//if (window.innerWidth <= 320) {smallBtn.style.top = (window.innerHeight - 60) + "px"; smallBtn.style.left = (window.innerWidth - 70) + "px";}
						//else if (window.innerWidth <= 375) {smallBtn.style.top = (window.innerHeight - 60) + "px"; smallBtn.style.left = (window.innerWidth - 70) + "px";}
						//else { smallBtn.style.top = (window.innerHeight - 70) + "px"; smallBtn.style.left = (window.innerWidth - 80) + "px"; }
						}
				}
			}
		}
		
		function deleteItem()
		{
			sendDocs="";
			countOfItems=0;
			elements = document.getElementsByClassName("chk");
			var items = "";
			
			Array.prototype.forEach.call(elements, function(el) {
				if (el.checked) { sendDocs += el.value + "~"; }
				else { items += '<div><input type="checkbox" checked onclick="javascript:changeSelect()" value="' + el.value + '" class="chk">' + el.id + '</div>'; countOfItems++;}
			});
			
			if (countOfItems>2) { document.getElementById('attachUpload').style.display = "none"; }
			else { document.getElementById('attachUpload').style.display = "block"; }
			
			checkBoxList.innerHTML = items;
			delete(items);
			
            var del=document.createElement("SCRIPT");
			del.src="/floatModule/delete.php?files=" + sendDocs;
			document.body.appendChild(del);
			
			delete(del);
			changeSelect();
		}
		
		function changeSelect()
		{
			elemOK = false;
			elements = document.getElementsByClassName("chk");
			
			Array.prototype.forEach.call(elements, function(el) {
				if (el.checked) { document.getElementById('deleteImg').innerHTML = '<img width="60px" height="60px" src="/floatModule/images/delete.png">'; elemOK = true; }
			});
			
			if (!elemOK)
			{
				document.getElementById('deleteImg').innerHTML = '';
			}
		}
		

		document.addEventListener("DOMContentLoaded", ready);
		
		function firstToSecond() { document.getElementById('title').innerHTML=getValue("Шаг 2 из 3~Step 2 of 3"); name = document.getElementById('Name').value; document.getElementById('Name').value=""; maxForm.removeChild(firstStep); maxForm.appendChild(secondStep); }
		function SecondToFirst() { document.getElementById('title').innerHTML=getValue("Задать вопросы юристу~Ask the lawyer questions"); maxForm.removeChild(secondStep); maxForm.appendChild(firstStep); document.getElementById('Name').value=name; }
		function SecondToThird() { maxForm.style.height = "160px"; document.getElementById('title').innerHTML=getValue("Шаг 3 из 3~Step 3 of 3"); mail = document.getElementById('Email').value; document.getElementById('Email').value=""; maxForm.removeChild(secondStep); maxForm.appendChild(thirdStep); }
		function ThirdToSecond() { maxForm.style.height = "120px"; document.getElementById('title').innerHTML=getValue("Шаг 2 из 3~Step 2 of 3"); maxForm.removeChild(thirdStep); maxForm.appendChild(secondStep); document.getElementById('Email').value=mail; }
		
		function ready()
		{
			//768
			var width = window.innerWidth,
				height = window.innerHeight;
			standartHeight = window.innerHeight;
				standartWidth = window.innerWidth;
			outWidth = window.outerWidth;
				outHeight = window.outerHeight;
			form.id = "form";
			sendElement.innerHTML = '<table><td><a class="confirm" disable style="border-radius: 10px; z-index: 100;" href="javascript:send()">' + getValue("Отправить~Send") + '</a></td><td width="7px"></td><td><a style="text-decoration:none" href="javascript:attachShowHide()"><img id="imgAttach" width="32" height="32" src="/floatModule/images/attach.png"></a></td></table>';
			
			form.style.cssText = 'box-shadow: 0 0 5px 2px #DABD33; border-radius: 10px; border-bottom-left-radius: 0; background-color: #F7F7F7; position: fixed;';
			form.innerHTML = '<div id="answer" onclick="windowState()" style="font-size: var(--inputFontSize); height: 22px; color: white; cursor: pointer; margin-bottom: 3px; border-top-left-radius: 10px; border-top-right-radius: 10px; background-color: #E89C6D;">' + getValue("Задать вопросы юристу~Ask the lawyer questions") + '</div>';
			img.style.cssText = 'width: 22px; height: 22px; position: fixed;';
			img.innerHTML = '<a href="javascript:windowState()"><img src="/floatModule/images/close.png"></a>';
			boxes.innerHTML = '<input id="Name" maxlength="20" onkeypress="return filter_input(event,/[A-Z  \'А-Я]/i)" style = "font-size: 0.8rem; margin-bottom: 3px;" class="Input-text" placeholder="' + getValue("Имя~Name") + '"><input id="Email" maxlength="40" onkeypress="return filter_input(event,/[A-ZА-Я@._0-9+="]/i)" style="font-size: 0.8rem; margin-bottom: 3px;" class="Input-text" placeholder="E-mail"><textarea type="text" maxlength="800" id="inputText" style="font-size: 0.8rem; margin-bottom: 14px; resize: none; z-index: 99;" class="Input-text" placeholder="' + getValue("Введите сообщение~Input message") + '"></textarea>';
			animationS.innerHTML = '<img src="/floatModule/images/ok.gif">';
			document.body.appendChild(form);
			form.appendChild(boxes);
			
			document.getElementById("Email").setAttribute("onkeypress", 'return filter_input(event,/[A-ZА-Я@._0-9+="]/i)');

			var height1;
			if (height > width) {height1 = ((height / 3) + 3) - 22; }
			else {height1 = ((height / 1.5) + 3) - 22; }
			
			attachWindow.style.cssText = '';
			attachWindow.innerHTML = '<table><td><a href="javascript:attachShowHide()"><img width="70px" height="70px" src="/floatModule/images/back.png"></a></td><td><div id="attachUpload" style="display: block; cursor: pointer" onclick="FindFile();" title="' + getValue("Загрузка файла~Load file") + '"><img width="64px" height="64px" src="/floatModule/images/upload.png"/></a></div><form action="/floatModule/upload.php" style="margin: 0px" target="rFrame" method="POST" enctype="multipart/form-data">  <div style="position:absolute; overflow: hidden; display:block; height:0px; width:0px; "><input type="file"   id="my_hidden_file" accept="image/jpeg,image/png,image/gif" name="loadfile" onchange="LoadFile();">  <input type="submit" id="my_hidden_load" style="display: none" value="' + getValue("Загрузить~Load") + '"></div></form><iframe id="rFrame" name="rFrame" style="display: none"></iframe></td><td><a id="deleteImg" style="text-decoration: none" href="javascript: deleteItem()"></a></td></table>';
			attachWindow.innerHTML += getValue("Файлы~Files") + ':<br>';
			
			attachWindow.appendChild(checkBoxList);

			form.style.top = (window.innerHeight - 22) + "px";
			form.style.left = (width - (width / 4) - 50) + "px";
			
			heightInput =  height1 - (document.getElementById('Name').style.height * 2) - document.getElementById('Email').style.height - 22 - 142;
			document.getElementById('inputText').style.height = 
				heightInput + "px";

			document.getElementById('answer').style.textIndent = (((width / 4) - 6) / 20) + "px";
			document.getElementById('Name').style.textIndent = (((width / 4) - 6) / 20) + "px";
			document.getElementById('Email').style.textIndent = (((width / 4) - 6) / 20) + "px";
			document.getElementById('inputText').style.padding = "10px";
			document.getElementById('inputText').style.width = (width / 4) - 21 + "px";
			if (window.innerWidth < 1366 && window.orientation == 0 || window.innerWidth < 1366 && window.orientation == 90 || window.innerWidth < 1366 && window.orientation == -90)
			{
				document.body.removeChild(form);
				maxForm.style.cssText = "position: fixed; background: rgba(239,239,239,0.9); top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%);";
				maxForm.innerHTML = '<a href="javascript:maximize()"><img style="float: left; margin-top: 2px; margin-right: 2px; width: 20px; height: 20px;" src="/floatModule/images/close.png"></a><center><div id="title" style="color: #ED670E">' + getValue("Задать вопросы юристу~Ask the lawyer questions") + '</div></center><br>';
				
				smallBtn.style.cssText = "position: fixed; cursor: pointer; top: 90%; left: 90%; -webkit-transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); transform: translate(-80%, -80%);";
				
				if (window.innerWidth <= 320) {maxForm.style.width = "200px"; smallBtn.innerHTML = '<a href="javascript:maximize()"><div class="img-circle"><img width="60px" height="60px" style="padding: 10px;" src="/floatModule/images/smallBtn.png"></div></a>'; smallBtn.style.width = "60px"; smallBtn.style.height = "60px";}
				else if (window.innerWidth <= 375) {maxForm.style.width = "280px"; smallBtn.innerHTML = '<a href="javascript:maximize()"><div class="img-circle"><img width="80px" height="80px" style="padding: 10px;" src="/floatModule/images/smallBtn.png"></div></a>'; smallBtn.style.width = "80px"; smallBtn.style.height = "80px"; }
				else {maxForm.style.width = "375px"; smallBtn.innerHTML = '<a href="javascript:maximize()"><div class="img-circle"><img width="90px" height="90px" style="padding: 10px;" src="/floatModule/images/smallBtn.png"></div></a>'; smallBtn.style.width = "90px"; smallBtn.style.height = "90px";}
				//maxForm.style.width = "";
				maxForm.style.height = "120px";
				maxForm.style.top = (height / 2) - 60 + "px";
				
				firstStep.innerHTML = '<table style="width: 100%"><td style="width: 10%"></td><td style="width: 80%"><input id="Name" maxlength="20" onkeypress="return filter_input(event,/[A-Z \'А-Я]/i)" style = "position: fixfont-size: 0.8rem; margin-bottom: 3px; text-indent: 10px;" class="Input-text" placeholder="' + getValue("Ваше имя~Your name") + '"></td><td style="width: 10%;"><center><a href="javascript:firstToSecond()"><img width="42px" height="42px" src="/floatModule/images/nextF.png"></a></center></td></table>';
				secondStep.innerHTML = '<table style="width: 100%"><td style="width: 10%"><center><a href="javascript:SecondToFirst()"><img width="42px" height="42px" src="/floatModule/images/backF.png"></a></center></td><td style="width: 80%"><input id="Email" maxlength="40" onkeypress="return filter_input(event,/[A-ZА-Я@._0-9+="]/i)" style="font-size: 0.8rem; text-indent: 10px; margin-bottom: 3px;" class="Input-text" placeholder="E-mail"></td><td style="width: 10%"><center><a href="javascript:SecondToThird()"><img width="42px" height="42px" src="/floatModule/images/nextF.png"></a></center></td></table>';
				thirdStep.innerHTML = '<table style="width: 100%;"><td style="width: 10%"><center><a href="javascript:ThirdToSecond()"><img width="42px" height="42px" src="/floatModule/images/backF.png"></a></center></td><td style="width: 80%; padding-right: 15px;"><textarea type="text" maxlength="800" id="inputText" style="font-size: 0.8rem; margin-bottom: 3px; height: 50px; resize: none; padding-left: 10px;" class="Input-text" placeholder="' + getValue("Введите сообщение~Input message") + '"></textarea></td><td style="width: 10%"><a style="text-decoration: none; cursor: pointer;" href="javascript:send()"><img width="40px" height="40px" src="/floatModule/images/send.png"></a><br></td></table><a href="javascript:attachShowHide()"><img style="float: right; padding: 2px;" id="imgAttach" width="36" height="36" src="/floatModule/images/attach.png"></a>';
				
				maxForm.appendChild(firstStep);
				
				
				//smallSend.innerHTML = '<table><tr><td><a style="text-decoration: none; cursor: pointer;" href="javascript:send()"><img src="/floatModule/images/send.png"></a></td></tr><tr><td><a style="text-decoration:none" href="javascript:attachShowHide()"><img id="imgAttach" width="32" height="32" src="/floatModule/images/attach.png"></a></td></tr></table>';
				smallSend.style.cssText = "position: fixed";
				smallSend.style.top = heightInput + "px";
				smallSend.style.left = (width - (55) - 20) + "px";
				smallSend.style.width = (55) + "px";
				smallSend.style.height = (55) + "px";
				
				formHeight = (width / 8);
				formWidth = (width / 8);
				document.body.appendChild(smallBtn);
				boxes.appendChild(smallSend);
			}
			else 
			{
				form.style.width = (width / 4) + "px";
				form.style.height = "22px";
				if (height < 414) { formHeight = "414px";}
				else if (height > width) {formHeight = height / 3;}
				else {formHeight = ((height / 1.5) + 3);}
				formWidth = (width / 4);
				
				boxes.appendChild(sendElement);
			}
			//form.removeChild(boxes);
		}