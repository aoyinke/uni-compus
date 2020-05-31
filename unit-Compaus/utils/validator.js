function changeUserInfoValidator(userInfo){
	let errMsg = ''
	if(!userInfo.avatar){
		errMsg = "头像不能为空"
		
	}
	if(!userInfo.nickName){
		errMsg = "昵称不能为空"
		
	}
	if(userInfo.coverImgs.length>9){
		errMsg = "封面图片不能超过9张"
		
	}
	if(Array.isArray(userInfo.tags)){
		errMsg = "用户标签出错"

	}
	return errMsg
}

function activityInoValidator(activity,imgs){
	let errMsg=''
	if(!activity.type){
		errMsg = "类型不能为空"
	}
	if(!activity.category){
		errMsg = "类别不能为空"
	}
	if(!activity.groupId && (activity.type == 100 || 200)){

		errMsg = "前两类团队类别不能为空"
	}
	if(imgs.length>9){
		errMsg = "上传图片不能超过9张"
	}
	if((activity.type == 400) && !activity.content){
		errMsg = "发布知识的时候，正文内容不能为空"
	}
	return errMsg
}

function groupRegisterValidator(groupInfo){
	let errMsg = ''
	if(!groupInfo.groupName){
		errMsg = "社团名称不能为空"
	}
		
	if(!groupInfo.college){
		errMsg = "社团或社团负责人所属学校不能为空"
	}
	if(!groupInfo.category){
		errMsg = "类别不能为空"
	}
	if(!groupInfo.logo){
		errMsg = "社团或小组Logo不能为空"
	}
	return errMsg
}

function changeGroupInfoValidator(groupInfo){
	let errMsg = ''
	if(!groupInfo.groupName){
		errMsg = "社团名称不能为空"
	}
		
	if(!groupInfo.college){
		errMsg = "社团或社团负责人所属学校不能为空"
	}
	if(!groupInfo.category){
		errMsg = "类别不能为空"
	}
	if(!groupInfo.logo){
		errMsg = "社团或小组Logo不能为空"
	}
	if(groupInfo.coverImgs.length<1){
		errMsg = "社团封面图片数量不能少于1张"
	}
	return errMsg
}

function publishNeedValidator(needInfo){
	let errMsg = ''
	if(!needInfo.content){
		errMsg = "需求内容不能为空"
	}
	if(!needInfo.title){
		errMsg = "需求标题不能为空"
	}
	if(!needInfo.category){
		errMsg = "需求类别不能为空"
	}
		
	
	return errMsg
}
export {
	changeUserInfoValidator,
	activityInoValidator,
	groupRegisterValidator,
	changeGroupInfoValidator,
	publishNeedValidator
}