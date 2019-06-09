<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="gg-leftbar f-fl">
<link href="${ctx }/css/menuInfo.css" rel="stylesheet" type="text/css" />
<script src="${ctx }/js/view/system/menuInfo/showList.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function(){
	$('#h41').click();
});
</script>
	<div class="operate">
        <h3> 菜单导航 </h3>
        <ul id="J_navlist">
        	<c:forEach items="${userInfo.insPermissionsList }" var="insPermissions" varStatus="vs" >
			  <li>
			  <h4 id='h4${vs.index }'>${insPermissions.menuName }</h4>
			  <c:choose>
				<c:when test="${not empty insPermissions.insPermissionsList}">
			  	<div class="list-item none">
			      <c:forEach items="${insPermissions.insPermissionsList }" var="ins">
			      <p><a href="${ctx }${ins.menuLink}">${ins.menuName }</a></p>
			      </c:forEach>
			  	</div>
			    </c:when>
			  </c:choose>
			  </li>
			</c:forEach>
        </ul>
	</div>
<div style="text-align:center;clear:both">
<p></p>
<p></p>
</div>
</div>