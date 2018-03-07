
$(function(){
	new Vue({
		el: '#app',
		data: {
			title: 123,
			image: [[]],
			table: false,
			style1: '',
			arr: [1,2],
			titleArr: [],
			hrefs: []
		},
		methods: {
			sub: function(){
				var that = this;
				var $img = $('.wrapper .el img');
				var arr = [[]];
				that.table = true;
				var tr = {arr:[],index:0};
				var top = $img[0].offsetTop;
	            
				$img.each(function(i){
					this.setAttribute('h',that.hrefs[i].replace(/&amp;/g,'&'));
					this.setAttribute('title',that.titleArr[i]);
					if(this.offsetTop == top){
						arr[tr.index].push(this);
					}else{
						top = this.offsetTop;
						arr.push([]);
						tr.index ++;
						arr[tr.index].push(this);
					}
				});
				that.image = arr;
				this.$refs.wrapper.remove();
				
				//style
				function style(image){
					var rules = document.styleSheets[0].cssRules;
					for(var i = 0; i < rules.length; i++){
						if(rules[i].media){
							var arr = rules[i].cssText;
							var device = 0;
							if(rules[i].cssText.indexOf('max-device-width: 480px') >= 0){
								device = 414;
								
							}else if(rules[i].cssText.indexOf('max-device-width: 375px') >= 0){
								device = 375;
							}else if(rules[i].cssText.indexOf('max-device-width: 360px') >= 0){
								device = 360;
							}else if(rules[i].cssText.indexOf('max-device-width: 325px') >= 0){
								device = 325;
							}else if(rules[i].cssText.indexOf('max-device-width: 320px') >= 0){
								device = 320;
							}else if(rules[i].cssText.indexOf('max-device-width: 285px') >= 0){
								device = 285;
							}
							
							for(var j = 0; j < image.length; j++){
								arr = arr.substr(0,arr.length - 1)
								
								+ 'table[class="p-bottom'+ j +'"],' + 'table[class="p-bottom' + j +'"] a'
								+ '{height:' + Math.floor(image[j][0].height * device/650) +
								'px!important;width: 100% !important;}' + '}';
							}
							that.style1 += arr;
						}else{
							that.style1 += rules[i].cssText;
						}
					}
					document.querySelector('style').innerHTML = that.style1;
					console.log(that.style1);
				}
				style(that.image);
			},
			setImagePreview: function (avalue) {
				var $uploadPhoto = $('.wrapper');
	            var $uploadPhotoPar = $uploadPhoto.parent();
	            var $uploadPhotoPre = $uploadPhoto.prev();
	            //$uploadPhoto.remove();
	            var docObj = this.$refs.upFile1;
	            
	            for (i = 0; i < docObj.files.length ; i++) {
	                var imgObjPreview = new Image();
	                if (docObj.files && docObj.files[i]) {
	                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
	                    imgObjPreview.name = docObj.files[i].name;
	                    var arr = this.image[0];
	                    arr.push(imgObjPreview);
                    	Vue.set(this.image, 0, arr);
	                }
	            }
			}
		},
		mounted: function(){
			var that = this;
			$.get('title.html',function(res){
				$('.title').html(res);
				
				function title(titleArr){
					var titleWrapper = $('.title').find('.MsoNormal');
					titleWrapper.each(function(i){
						var title = $(this).find('span');
						var text = '';
						title.each(function(){
							var color = this.style.color;
							if(color == 'rgb(255, 0, 0)'){
								if(this.innerHTML.indexOf('<o') != -1){
									return ;
								}
								text += this.innerHTML;
							}
						})
						if(text == ''){
							return ;	
						}
						
						that.titleArr.push(text.replace(/&nbsp;/g,' '));
						
					});
				}
				title();
			})
			$.get('href.txt',function (res){
				$('#href').html(res);
	            var hrefs = $('#href').html().match(/https?:\/\/[^\s]+/g);
	            that.hrefs = hrefs;
	            console.log(that.hrefs);
			})
		}
		
	})
})

