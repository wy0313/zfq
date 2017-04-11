var formValuedate=function(formId,options){
	this.options=options;
	this.form=document.querySelector(formId);	//返回文档中匹配指定 CSS 选择器的一个元素
	this.formCheckList=this.form.querySelectorAll("input,select,textarea");
	this.detialPatternList={
		name:{
			pattern:"[\u4e00-\u9fa5]{2,4}",
			tipText:"用户名格式错误"
		},
		cardId:{
			pattern:"^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
			tipText:"身份证号格式错误"
		},
		card:{
			pattern:"[0-9]{12}",		//用于验证输入字段的模式
			tipText:"社保卡号格式错误"
		},
		phone:{
			pattern:"^[1][358][0-9]{9}$",
			tipText:"手机号码格式错误"
		},
		company:{
			pattern:"[\u4e00-\u9fa5]{4,10}",
			tipText:"公司名称格式错误"
		},
		comPhone:{
			pattern:"^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$",
			tipText:"公司电话格式错误"
		}
		
	}
	this.init();
}

var json={type:1,check:false}

formValuedate.prototype={
	init:function(){
		this.setForm();
		this.setInputPattern();
	},
	setForm:function(){
		var that=this;
		this.form.setAttribute("novalidate",true);//设置验证
		this.form.onsubmit=function(){	//提交时 返回
			if(that.checkAll()){
				return that.options.success();
			}else{
				return false;
			}
			// return that.checkAll();
		}
	},
	setInputPattern:function(){
		var formCheckList=this.formCheckList;
		for(var i=0;i<formCheckList.length;i++){
			var type=formCheckList[i].name;
			if(this.detialPatternList[type]){
				if(!formCheckList[i].getAttribute("pattern")){
					formCheckList[i].setAttribute("pattern",this.detialPatternList[type].pattern);
					formCheckList[i].setAttribute("tiptext",this.detialPatternList[type].tipText);
				}
					
			}
			var span=document.createElement("span");
			span.className="tip";
			formCheckList[i].parentNode.appendChild(span);
		}
	},
	/*验证方法*/
	check:function(item){
		var required=item.getAttribute("required");
		if(required!=null){		// required不为空 
			if(item.value!=""){
				if(item.checkValidity()){	// 显式验证方法  正确
					return {
						type:1,
						check:true
					}
				}else{
					return {
						type:2,
						check:false
					}
				}
			}else{
				return {
					type:1,
					check:false
				}
			}
		}else{						// required为空 
			if(item.value=="") {
				return {
					type : 1,
					check : true
				};
			}else{
				return {
					type : 2,
					check : item.checkValidity()
				}
			}		
		}
	},
	checkAll:function(){
		var formCheckList=this.formCheckList;
		var checkFlg=true;
		for(var i=0;i<formCheckList.length;i++){
			var checkJson=this.check(formCheckList[i]);
			if(!checkJson.check){
				this.checkTip(formCheckList[i],checkJson.type)
				checkFlg=false;
			}else{				
				formCheckList[i].parentNode.querySelector(".tip").innerText="";
			}
		}
		return checkFlg;
	},
	/*验证提示*/
	checkTip:function(item,type){
		if(type==1){
			item.parentNode.querySelector(".tip").innerText=item.getAttribute("required");
		}else if(type==2){
			item.parentNode.querySelector(".tip").innerText=item.getAttribute("tiptext");
		}
	}
}

$.fn.form=function(opt){
	new formValuedate(this.selector,opt);
}