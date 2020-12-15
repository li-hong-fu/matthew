// pages/my/userAdmin/userAdmin.js
import User from '../../../models/user/user'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:null,
        navbarTitle:'船舶管理',
        addButtonText:'添加船舶',
        active: 1,
        tabList:[{
            title:'审核中'
        },{
            title:'已通过'
        },{
            title:'未通过'
        }],
        status:null,
        emptyState:true,
        seeList:[{
            title:'运输舰'
        },{
            title:'驱逐舰'
        },{
            title:'巡航舰'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.navbarTitle(options)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.myFriendsRequestFriends()
    },

    //修改导航栏标题
    navbarTitle:function(options){
        this.setData({
            status:options.status
        })
        let id = options.id;
        if(id === '115'){
            this.setData({
                id,
                navbarTitle:'船舶管理',
                addButtonText:'添加船舶'
            })
            return
        }else{
            this.setData({
                id,
                navbarTitle:'车辆管理',
                addButtonText:'添加车辆'
            })
        }
    },

    //获取船列表
    myFriendsRequestFriends(){
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {Authorization,page,rows}
        User.myFriendsRequestFriends(params).then(res => {
            console.log(res)
            let datas = res.data.data;
            if(datas.total === 0){
                // this.setData({
                //     emptyState:false
                // })
                console.log(this.data.emptyState)
            }
        })
    },

    onChange(event) {
        // console.log(event.detail.index)
        this.setData({
            status:event.detail.index,
        })
        
        wx.showToast({
            title: `切换到标签 ${event.detail.name}`,
            icon: 'none',
        });
    },
    addButton(){
        let id = this.data.id;
        console.log(id)
        wx.navigateTo({
          url: '/pages/my/user-admin/user-admin-info/user-admin-info?id=' + id,
        })
    }
})