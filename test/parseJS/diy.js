// 默认提交路径
var url = basePath + '/diy/save';
// 默认可编辑区域
var TShirtScope = {
	x : 157,
	y : 137,
	w : 186,
	h : 249
}
var PhoneScope = {
	x : 156,
	y : 80,
	w : 186,
	h : 380
}
var PillowScope = {
	x : 102,
	y : 62,
	w : 303,
	h : 378
}
var BagScope = {
	x : 158,
	y : 263,
	w : 184,
	h : 227
}
var currentScope = TShirtScope;
// diy自定义配置
var config = {
	maxSize_image: 5,		// 最多图层限制数量
	scaleScope_max: 2,		// 缩放最大范围限制
	scaleScope_min: 0.1,	// 缩放最小范围限制
	lineWidth: 1,			// 边框线粗细
	strokeStyle: '#000000',	// 边框线颜色
	fillStyle: '#000000',	// 节点填充颜色
	nodeStyle: 1,			// 节点样式:1方块,0圆点
	scaleAreaSize: 4		// 节点大小
}
$(function() {
	$('.form_text_ipt input').focus(function(){
		$(this).parent().css({
			'box-shadow':'0 0 3px #bbb'
		});
	});
	$('.form_text_ipt input').blur(function(){
		$(this).parent().css({
			'box-shadow':'none'
		});
		//$(this).parent().next().hide();
	});

	var style = '<style type="text/css">\n' +
					'#diy{ position: absolute; top: 0; left: 0; width: 100%; height: 100%;}\n' +
					'.divUserBox .customMade .colorBox{ position: static;}\n' +
				'</style>';
	$('head').append(style);
	/************** 类目模板选择 **************/
	// 选择模板
	$('.customMade .navType .list').click(function() {
		$('.firstStep').show();
		$('.saveSuccess').hide();
		$('.myGame').hide();
	});
	// T恤
	$('#TShirtTemplateId').click(function() {
		currentScope = TShirtScope;
		getTemplateByCode($(this)[0], 'TShirtTemplateId');
		// 更改类目
		setCatalog('TShirtCatalog');
	});
	// 手机壳
	$('#phoneTemplateId').click(function() {
		currentScope = PhoneScope;
		getTemplateByCode($(this)[0], 'phoneTemplateId');
		// 更改类目
		setCatalog('PhoneCatalog');
	});
	// 抱枕
	$('#pillowTemplateId').click(function() {
		currentScope = PillowScope;
		getTemplateByCode($(this)[0], 'pillowTemplateId');
		// 更改类目
		setCatalog('PillowCatalog');
	});
	// 帆布袋
	$('#bagTemplateId').click(function() {
		currentScope = BagScope;
		getTemplateByCode($(this)[0], 'bagTemplateId');
		// 更改类目
		setCatalog('BagCatalog');
	});
	// 默认选择第一个模板
	currentScope = TShirtScope;
	getTemplateByCode($(this)[0], 'TShirtTemplateId');
	
	/************** 素材库操作 **************/
	// 默认素材风格
	setTimeout(function() {
		$('.HBF_navList')[0].click();
	}, 100);
	
	/************** diy操作按钮 **************/
	// 对齐方式
	$('.am_top').click(function() {
		hbdiy.topImage();
	});
	$('.am_middle').click(function() {
		hbdiy.middleImage();
	});
	$('.am_bottom').click(function() {
		hbdiy.bottomImage();
	});
	$('.am_left').click(function() {
		hbdiy.leftImage();
	});
	$('.am_center').click(function() {
		hbdiy.centerImage();
	});
	$('.am_right').click(function() {
		hbdiy.rightImage();
	});
	// 重置
	$('.reset').click(function() {
		hbdiy.deleteAll();
	});
	// 撤消&重做
	$('.repealPrev').click(function() {
		hbdiy.undo();
	});
	$('.repealNext').click(function() {
		hbdiy.redo();
	});
	
	/************** DIY素材应用 **************/
	// 应用文字
	$('#useText').click(function() {
		var $diy_text = $('#diy-text');
		if (!$diy_text.val()) {
			$diy_text.focus();
			return;
		}
		var $fontsize = $('#fontsize').val();
		var url = basePath + '/diy/text2image?text='+ encodeURI($diy_text.val())
							+ '&fontsize=' + $fontsize * 2
							+ '&family=' + encodeURI($('#diy-family').val())
							+ '&color=' + $('#diy-color').val().replace('#', '');
		var file = basePath + '/diy/text2image?text=' + encodeURI($diy_text.val())
							+ '&fontsize=500&family=' + encodeURI($('#diy-family').val())
							+ '&color=' + $('#diy-color').val().replace('#', '');
		hbdiy.addImage(url, file, 2);
	});
	// 修改文字字体
	$('#diy-family-ul li').click(function() {
		var $diy_text = $('#diy-text');
		if (!$diy_text.val()) {
			$diy_text.focus();
			return;
		}
		var $fontsize = $('#fontsize').val();
		var url = basePath + '/diy/text2image?text='+ encodeURI($diy_text.val())
							+ '&fontsize=' + $fontsize * 2
							+ '&family=' + encodeURI($(this).attr('scroll-value'))
							+ '&color=' + $('#diy-color').val().replace('#', '');
		var file = basePath + '/diy/text2image?text=' + encodeURI($diy_text.val())
							+ '&fontsize=500&family=' + encodeURI($(this).attr('scroll-value'))
							+ '&color=' + $('#diy-color').val().replace('#', '');
		hbdiy.editImage(url, file, 2);
	});
	// 修改文字颜色
	$('#diy-color-ul li span').click(function() {
		var $diy_text = $('#diy-text');
		if (!$diy_text.val()) {
			$diy_text.focus();
			return;
		}
		var $fontsize = $('#fontsize').val();
		var url = basePath + '/diy/text2image?text='+ encodeURI($diy_text.val())
							+ '&fontsize=' + $fontsize * 2
							+ '&family=' + encodeURI($('#diy-family').val())
							+ '&color=' + $(this).attr('scroll-value').replace('#', '');
		var file = basePath + '/diy/text2image?text=' + encodeURI($diy_text.val())
							+ '&fontsize=500&family=' + encodeURI($('#diy-family').val())
							+ '&color=' + $(this).attr('scroll-value').replace('#', '');
		hbdiy.editImage(url, file, 2);
	});
	
	// 上传素材事件
	$('#uploadDesignMaterial').change(function() {
		uploadDesignMaterial();
	});
	function uploadDesignMaterial() {
		$.getJSON(basePath + '/diy/getDesignMaterialId', function(json) {
			var designMaterialId = json.id;
			uploadFile('uploadDesignMaterial', json.id, 'main', '200*auto', function(data) {
				hbdiy.addImage(basePath + '/diy/getImage?objectId=' + designMaterialId + '&thumb=200*auto', data[0].fileUrl, 1);
				initUploadDesignMaterial();
			});
		});
	}
	function initUploadDesignMaterial() {
		$('#uploadDesignMaterial').unbind('change').change(function() {
			uploadDesignMaterial();
		});
	}
	
	/************** 跳转逻辑 **************/
	// 初次保存
	$('.firstStep .saveBtn').click(function() {
		save();
	});
	// 直接购买
	$('.buyBtn').click(function() {
		$productId = $('#productId').val();
		if ($productId != '') {
			location.href = basePath + '/diy/busying/' + $productId;
			//$.getJSON(basePath + '/diy/buy/' + $productId, function(json) {
			//	location.href = basePath + '/product-item/diy?id=' + json.code;
			//});
		}
	});
	// 返回修改
	$('.saveSuccess .amendBtn').click(function() {
		$('.saveSuccess').hide();
		$('.firstStep').show();
		hbdiy.unlock();
		// url改为修改
		url = basePath + '/diy/updateDiy';
	});
	// 我要参赛
	$('.saveSuccess .gameBtn').click(function() {
		$('.saveSuccess').hide();
		$('.myGame').show();
		// url改为修改
		url = basePath + '/diy/update';
	});
	// 保存/修改提交
	var saving = false;
	$('.myGame .gameSubBtn').click(function() {
		// 保存所有数据
		var $name = $('#name');
		if (!$name.val()) {
			$name.focus();
			return false;
		}
		// 保存参赛信息
		$.ajax({
			type: 'post',
			url: url,
			data: $('#diyForm').serialize(),
			dataType: 'json',
			beforeSend: function (XMLHttpRequest) {
				if (saving == true) {
					//alert('正在提交中，请误重复提交...');
					return false;
				}
				$('.myGame .gameSubBtn').text('参赛中...');
				saving = true;
			},
			success: function(json) {
				$('.myGame .gameSubBtn').text('提交');
				saving = false;
				if (json.result != 'success') {
					alert('参赛失败！');
					return false;
				}
				$('.joinGameSuccess').show();
				setTimeout(function() {
					location.reload(true);
					//location.href = basePath + '/product-item/diy?id=' + $('#designWorksId').val();
				}, 3000);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert('参赛失败！');
				$('.myGame .gameSubBtn').text('提交');
				saving = false;
			}
		});
	});
	
});

// 获取素材库列表
function getDesignMeterial(obj, styleId) {
	$('.HBF_picList ul').html('加载中...');
	$.getJSON(basePath + '/diy/getDesignMaterial/' + styleId, function(json) {
		var $li = [];
		for (var i in json) {
			$li.push('<li onclick="useImage(this);">');
			$li.push('	<img src="' + json[i].url + '" data-image="' + json[i].file + '" alt="' + json[i].name + '"/>');
			$li.push('	<div class="shade"></div>');
			$li.push('</li>');
		}
		$('.HBF_picList ul').html($li.join(''));
	});
}
// 使用素材
function useImage(obj) {
	hbdiy.addImage($(obj).find('img').attr('src'), $(obj).find('img').data('image'), 1);
	// 关闭弹框
	$('.chooseHBFrame').hide();
}

// 获取code模板
function getTemplateByCode(obj, templatecode, code, id) {
	$('#template').html('');
	$('.colorList').html('');
	$('#templateName').val(templatecode);
	$.getJSON(basePath + '/diy/getTemplateByCode/' + templatecode, {random:Math.random()}, function(json) {
		setTemplate(json, code, id);
	});
}
// 获取id模板
function getTemplateById(obj, templateid, code, id) {
	currentScope = PhoneScope;
	$('#template').html('');
	$('.colorList').html('');
	// TODO
	$('#templateName').val('phoneTemplateId');
	$.getJSON(basePath + '/diy/getTemplateById/' + templateid, {random:Math.random()}, function(json) {
		setTemplate(json, code, id);
	});
}
// 处理模板数据
function setTemplate(json, code, id) {
	if (!json.templateid) {
		alert('模板加载失败，请刷新重试！');
	} else {
		// 显示颜色属性值
		var $html = [];
		for (var i in json.attributeAndValueVOs) {
			if (json.attributeAndValueVOs[i].attributeCode != 'IP1') {
				continue;
			}
			for (var j in json.attributeAndValueVOs[i].values) {
				var className = '';
				if (json.attributeAndValueVOs[i].values[j].remark == '白色') {
					className = 'white';
				}
				if (json.attributeAndValueVOs[i].values[j].remark == '黑色') {
					className = 'black';
				}
				if (json.attributeAndValueVOs[i].values[j].remark == '灰色') {
					className = 'gray';
				}
				if (json.attributeAndValueVOs[i].values[j].remark == '红色') {
					className = 'red';
				}
				if (json.attributeAndValueVOs[i].values[j].remark == '蓝色') {
					className = 'blue';
				}
				if (json.attributeAndValueVOs[i].values[j].remark == '透明色') {
					className = 'transparent';
				}
				if (json.attributeAndValueVOs[i].values[j].remark == '黄色') {
					className = 'yellow';
				}
				if (json.attributeAndValueVOs[i].values[j].remark == '原色') {
					className = 'transparent';
				}
				if (json.attributeAndValueVOs[i].values[j].isDefault == true) {
					$html.push('<li class="active current ' + className + '" onclick="selectColor(this, \'' + json.attributeAndValueVOs[i].values[j].attributeValueId + '\');">');
					$html.push('	<div class="status c_' + className + '" color-value="' + json.attributeAndValueVOs[i].values[j].attributeValueId + '"></div>');
					$html.push('</li>');
				} else {
					$html.push('<li class="active ' + className + '" onclick="selectColor(this, \'' + json.attributeAndValueVOs[i].values[j].attributeValueId + '\');">');
					$html.push('	<div class="status c_' + className + '" color-value="' + json.attributeAndValueVOs[i].values[j].attributeValueId + '"></div>');
					$html.push('</li>');
				}
			}
		}
		$('.colorList').html($html.join(''));
		// 加载当前模板所有属性和属性值
		$html = [];
		$html.push('<div class="attrbutes" style="display:none;">');
		for (var i in json.attributeAndValueVOs) {
			var hasDefault = 0;
			$html.push('<span><b>' + json.attributeAndValueVOs[i].attributeName + '：</b>');
			for (var j in json.attributeAndValueVOs[i].values) {
				var isDefault = '';
				// 先判断是否是直接点选下拉
				if (!!id) {
					if (json.attributeAndValueVOs[i].attributeCode == code && json.attributeAndValueVOs[i].values[j].attributeValueId == id) {
						isDefault = 'checked="checked"';
						hasDefault = 1;
					} else {
						// 如果该属性没有传过默认值，则设置默认值
						if (hasDefault == 0) {
							if (json.attributeAndValueVOs[i].values[j].isDefault == true) {
								isDefault = 'checked="checked"';
							}
						}
					}
				} else {
					if (json.attributeAndValueVOs[i].values[j].isDefault == true) {
						isDefault = 'checked="checked"';
						hasDefault = 1;
					}
				}
				
				$html.push('<label for="' + json.attributeAndValueVOs[i].values[j].attributeValueId + '">');
				$html.push('	<input id="' + json.attributeAndValueVOs[i].values[j].attributeValueId + '" scroll-type-value="' + json.attributeAndValueVOs[i].values[j].attributeValue + '" type="radio" name="attributeName' + i + '" value="' + json.attributeAndValueVOs[i].values[j].attributeValueId + '" ' + isDefault + ' onclick="checkValue();"/>' + json.attributeAndValueVOs[i].values[j].remark);
				$html.push('</label>　');
			}
			$html.push('</span>');
		}
		$html.push('</div>');
		$('#template').html($html.join(''));
		
		// 设置当前模板id
		$('#attributesTemplateId').val(json.templateid);
		$('#diyscope').val(JSON.stringify(currentScope));
		checkValue();
	}
}
// 选择颜色
function selectColor(obj, id) {
	// 修改样式
	$('.colorList li').removeClass('current');
	$(obj).addClass('current');
	// 调用选择值事件
	$('#' + id).attr('checked', 'checked');
	checkValue();
}
// 选择属性
function selectCode(obj, code, id) {
	// 判断是否选择模板
	$parent = $(obj).parent().parent().parent().parent();
	if ($parent.hasClass('current') == false) {
		$('#template').html('');
		$('.colorList').html('');
		$('#templateName').val($parent.attr('id'));
		// T恤
		if ($parent.attr('id') == 'TShirtTemplateId') {
			currentScope = TShirtScope;
			getTemplateByCode($(this)[0], 'TShirtTemplateId', code, id);
		}
		// 手机壳
		if ($parent.attr('id') == 'phoneTemplateId') {
			currentScope = PhoneScope;
			getTemplateByCode($(this)[0], 'phoneTemplateId', code, id);
		}
		// 抱枕
		if ($parent.attr('id') == 'pillowTemplateId') {
			currentScope = PillowScope;
			getTemplateByCode($(this)[0], 'pillowTemplateId', code, id);
		}
		// 帆布袋
		if ($parent.attr('id') == 'bagTemplateId') {
			currentScope = BagScope;
			getTemplateByCode($(this)[0], 'bagTemplateId', code, id);
		}
		// 继续当前操作 TODO
		return false;
	}
	$('#' + id).attr('checked', 'checked');
	checkValue();
}
// 获取胚衣
function checkValue() {
	var flag = true;
	var values = [];
	$('.attrbutes span').each(function(i) {
		var $checkedRadio = $(this).find('input[type=radio]:checked');
		if (!$checkedRadio.length) {
			flag = false;
		} else {
			values.push($checkedRadio.val());
		}
	});
	// 如果当每行都选中属性，则获取对应的胚衣
	if (!!flag) {
		var attributeValueIdArray = values.join('-');
		$('#preview_bg').attr('src', '');
		$.getJSON(basePath + '/diy/getMaterial/' + attributeValueIdArray, function(json) {
			if (!json.image) {
				alert('此款式暂时不能DIY！');
				location.reload(true);
				return;
			}
			$('#materialId').val(json.materialId);
			$('#attributeValueGroupId').val(json.attributeValueGroupId);
			$('#preview_bg').attr('src', json.image);
			// 初始化diy
			hbdiy.init({
				diyid: 'diy',			// canvas的id
				scope_x: currentScope.x,			// 可编辑区域范围
				scope_y: currentScope.y,
				scope_width: currentScope.w,
				scope_height: currentScope.h,
				maxSize_image: config.maxSize_image,		// 最多图层限制数量
				maxSize_text: 5,
				scaleScope_max: config.scaleScope_max,	// 缩放范围限制
				scaleScope_min: config.scaleScope_min,
				resizeType: 1,
				lineWidth: config.lineWidth,			// 焦点样式
				strokeStyle: config.strokeStyle,
				fillStyle: config.fillStyle,
				nodeStyle: config.nodeStyle,
				scaleAreaSize: config.scaleAreaSize,
				debug: config.debug,			// 调式
				tools: basePath + '/static/images/tools.png'
			});
			hbdiy.unlock();
			// 如果有初始化类目
			if (c != '') {
				if (c == 'TShirtTemplateId') {
					currentScope = TShirtScope;
					getTemplateByCode($(this)[0], 'TShirtTemplateId');
					// 更改类目
					setCatalog('TShirtCatalog');
				}
				if (c == 'phoneTemplateId') {
					currentScope = PhoneScope;
					getTemplateByCode($(this)[0], 'phoneTemplateId');
					// 更改类目
					setCatalog('PhoneCatalog');
				}
				if (c == 'pillowTemplateId') {
					currentScope = PillowScope;
					getTemplateByCode($(this)[0], 'pillowTemplateId');
					// 更改类目
					setCatalog('PillowCatalog');
				}
				if (c == 'bagTemplateId') {
					currentScope = BagScope;
					getTemplateByCode($(this)[0], 'bagTemplateId');
					// 更改类目
					setCatalog('BagCatalog');
				}
				$('.navType .list').removeClass('current');
				$('#' + c).addClass('current');
				c = '';
			}
			// 如果有初始化素材
			setTimeout(function() {
				if (d != '') {
					hbdiy.addImage(basePath + '/diy/getImage?objectId=' + d + '&thumb=200*auto', basePath + '/diy/getImage?objectId=' + d, 1);
					d = '';
				}
			}, 1000);
		});
	}
}
// 更改类目
function setCatalog(id) {
	$('.gStyle .ui-rc_list1').removeClass('checked');
	$('#' + id).addClass('checked');
}
// 初次保存
var saving = false;
function save() {
	// 保存所有数据
	$.ajax({
		type: 'post',
		url: url,
		data: $('#diyForm').serialize(),
		dataType: 'json',
		beforeSend: function (XMLHttpRequest) {
			if (saving == true) {
				//alert('正在提交中，请误重复提交...');
				return false;
			}
			$('.firstStep .saveBtn').text('提交中...');
			saving = true;
		},
		success: function(json) {
			$('.firstStep .saveBtn').text('保存');
			saving = false;
			if (json.result != 'success') {
				// 未登录
				if (json.data == 'login') {
					$('#layer_bg').show(0, function() {
						$('#newlayer').show(0);
					});
				}
				// 保存失败
				else {
					alert('保存失败，请刷新重试！');
				}
				return false;
			}
			hbdiy.lock();
			
			// 得到保存数据以备修改
			$('#designWorksId').val(json.designWorksId);
			$('#productId').val(json.productId);
			
			// 切换界面
			$('.firstStep').hide();
			$('.saveSuccess').show();
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert('保存失败，请刷新重试！');
			$('.firstStep .saveBtn').text('保存');
			saving = false;
		}
	});
}
