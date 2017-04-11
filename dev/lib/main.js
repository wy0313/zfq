define(function(require,exports,module){
	require("swiper");
	require("zepto");
	require("iscroll");
	require("iosSelect");
	require("form");

	swiper=require("Swiper");
	alerts=require("alerts");

	// 下拉菜单
	alerts.click({
		ele:$("#salaryId"),
		title:'选择月薪',
		data:[{'id': '10001', 'value': '3000--4999元'},
		    {'id': '10002', 'value': '5000--7999元'},
		    {'id': '10003', 'value': '7000--9999元'},
		    {'id': '10004', 'value': '1万元及以上'}
		]
	})
	alerts.click({
		ele:$("#educationId"),
		title:'选择学历',
		data:[{'id': '10001', 'value': '高中'},
		    {'id': '10002', 'value': '中专'},
		    {'id': '10003', 'value': '大专'},
		    {'id': '10004', 'value': '本科'},
		    {'id': '10005', 'value': '研究生'},
		    {'id': '10006', 'value': '博士生'},
		    {'id': '10007', 'value': '其它'}
		]
	})

	// 表单验证
	$("#step1").form({
		success:function(){
			step.step1();
			return false;
		}
	})
	$("#next1").on("click",function(){
		var step1=$("#step1")
		if(step1.form()){
			receive={
				name:step1.find("#name").val(),
				cardId:step1.find("#cardId").val(),
				card:step1.find("#card").val(),
				phone:step1.find("#phone").val(),
				company:step1.find("#company").val(),
				comPhone:step1.find("#comPhone").val()
			}
			
			$.each(receive,function(i,v){
				sessionStorage.setItem(i,v);
			})
			
			location.href="controllers/submit.html";
		}
	})
})