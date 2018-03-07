
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
				alert('复制浏览器代码链接中会包含&amp;记得全局替换');
				alert('复制浏览器代码链接中会包含&amp;记得全局替换');
				var that = this;
				var $img = $('.wrapper .el img');
				var arr = [[]];
				that.table = true;
				var tr = {arr:[],index:0};
				var top = $img[0].offsetTop;
				$img.each(function(i){
					this.setAttribute('h',that.hrefs[i].replace(/&amp;/g,'&'));
					this.setAttribute('title',that.titleArr[i]);
					this.setAttribute('noHref',$(this).next().val());
					if($(this).next().val() !== ''){
						that.hrefs.splice(i,0,' ');
						that.titleArr.splice(i,0,' ');
						this.setAttribute('h',that.hrefs[i].replace(/&amp;/g,'&'));
						this.setAttribute('title',that.titleArr[i]);
					}
					if(this.offsetTop == top){
						arr[tr.index].push(this);
					}else{
						top = this.offsetTop;
						arr.push([]);
						tr.index ++;
						arr[tr.index].push(this);
					}
				});
				console.log(that.hrefs,that.titleArr)
				that.image = arr;
				this.$refs.wrapper.remove();
			},
			setImagePreview: function (avalue) {
				alert('记得确认不需要配置连接的图片，输入框中输入 1');
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
					var titleWrapper = $(unescape($('.title').html())).find('p');
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
						if(text == '' || text == '&nbsp;' || text.replace(/&nbsp;/g,' ').trim() == ''){
							return ;	
						}
						console.log(text)
						that.titleArr.push(text.replace(/&nbsp;/g,' ').trim());
						
					});
					console.log(that.titleArr);
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

