$(function(){

    var toDoList = {
        // 初始化方法
        init:function(){
            this.cacheElement()
            this. bindEvent()
        },
        // 缓存元素(获取元素)
        cacheElement:function(){
            this.$ipt = $('.ipt')
            this.$add = $('.add')
            this.$todolist = $('.todolist')
            this.$all = $('.all')
            this.$removes = $('.removes')
            this.$done = $('.done')
            this.$donelist = $('.donelist')
        },
        // 绑定事件
        bindEvent:function(){
            var _this = this // 指向toDoList
            // 点击添加任务
            this.$add.click(function(){
                var conText = _this.$ipt.val()
                // var conText = $(this).siblings('.ipt').val()
                if(!conText){
                    return      // 如果值为空,return结束
                }
                // 要插入的dom结构
                var addDom = `
                <li>
                <input type="checkbox">
                    <span class="con">${conText}</span>
                    <span class="remove">删除</span>
                    <span class="edit">编辑</span>
                </li>`
                // todolist添加节点
                _this.$todolist.append(addDom)
                
                // 判断全选是否勾选
                if(_this.$all.prop('checked')){
                    _this.$todolist.find('li input').prop('checked',true)
                }

                // 清空输入框
                _this.$ipt.val('')
            })

            // 点击编辑
            this.$todolist.on('click','li .edit',function(){
                
                var repDom = $(this).siblings('.con')
                var repText = repDom.text()
                $('<input type="text" class="repIpt">').replaceAll(repDom)
                $('.repIpt').val(repText).focus()
            })
            
            // 编辑完成
            this.$todolist.on('blur','li .repIpt',function(){
                var iptVal = $(this).val()
                var repDom = '<span class="con">' + iptVal + '</span>'
                $(repDom).replaceAll($(this))
            })

            // 删除单个任务
            this.$todolist.on('click','li .remove',function(){
                $(this).parent().remove()
            })

            // 点击全选
            this.$all.click(function(){
                if($(this).prop('checked')){ // 全选
                $('.todolist li input').prop('checked',true);
                } else{ // 取消全选
                    $('.todolist li input').prop('checked',false)
                }
            })

            // 选择任务
            this.$todolist.on('click','li input',function(){
                var selectArr = []  // 用来记录所有选项的状态
                $('.todolist li input').each(function(index,item){
                    if($(item).prop('checked')){
                        selectArr.push('a')
                    }else {
                        selectArr.push('b')
                    }
                })
                // 判断selectAll数组中是否存在b,存在返回-1,说明选项不是全选状态
                if(selectArr.indexOf('b') === -1){ 
                    _this.$all.prop('checked',true)
                } else {
                    _this.$all.prop('checked',false)
                }
            })

            // 点击处理
            this.$done.click(function(){
                $('.todolist li input:checked').each(function(index,item){
                    var taskText = $(ietem).siblings('.con').text()
                    // 向已处理列表添加元素
                    _this.$donelist.append('<li>'+ taskText +'</li>')
                    // 删除当前元素的父节点
                    $(item).parent().remove()
                    _this.$all.prop('checked',false) // 取消全选
                })
            })

            // 点击删除(批量)
            this.$removes.click(function(){
                $('.todolist li input:checked').each(function(index,item){
                    // 删除当前元素的父节点
                    $(item).parent().remove()
                    _this.$all.prop('checked',false) // 取消全选
                })
            })
        }
    }
    toDoList.init();

})