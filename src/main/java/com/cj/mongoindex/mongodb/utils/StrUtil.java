package com.cj.mongoindex.mongodb.utils;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StrUtil {

	/**
     * 直接从信息返回对象中取返回值为字符串的值
     * @param strKey 返回参数的关键字
     * @return 返回参数的字符串值
     */
    public String getString(Map<String, Object> map, String strKey){
        String strReturn = "";
        
        if (map != null){
            Object object = map.get(strKey);
            if (object != null && object instanceof String){
                strReturn = (String)object;
            }
        }
        
        return strReturn;
    }
    
    /**
     * 直接从信息返回对象中取返回值为字符串数组的值
     * @param strKey 返回参数的关键字
     * @return 返回参数的字符串数组
     */
    public String[] getStringArray(Map<String, Object> map, String strKey){
        String[] strReturn = null;
        
        if (map != null) {
            Object object = map.get(strKey);
            if (object != null && object instanceof String[]) {
                strReturn = (String[])object;
            }
        }
        
        return strReturn;
    }   
    
    /**
     * 
     * @param map  :　需要取值的HashMap
     * @param key :　HashMap中的key
     * @return
     */
    public String getStringByKey(Map<String,Object> map,String key) {
        Object object = map.get(key);
        String str = null;
        
        if (object != null){
            if(object instanceof String[]){
                str = ((String[])object)[0];
            }else if(object instanceof String){
                str =  (String)object;
            }

            if(str==null){
                str = "";
            }
        }else{
            str = "";
        }
        
        return str;
    }
    
    
    /**
     * 
     * @param map  :　需要取值的HashMap
     * @param key :　HashMap中的key
     * @return
     */
    public String[] getStringsByKey(Map<String,Object> map,String key) {
        String[] strReturn = null;
        Object object = map.get(key);
        if (object != null)
        {
            if(object instanceof String[]){
                strReturn = (String[])object;
            }else if(object instanceof String){
                strReturn = new String[]{(String)object};
            }
        }
        return strReturn;
    }
    
    /**
     * 
     * @param map  :　需要取值的HashMap
     * @param key :　HashMap中的key
     * @return
     */
    public int getIntByKey(Map<String,Object> map,String key) {
        int ret = -1;
        String strTemp = getStringByKey(map,key);
        try{
            ret = Integer.valueOf(strTemp).intValue();
        }catch(Exception e){
            ret = -1;
        }
        return ret;
    }

    /**
     * 将null转换成空
     * @param obj 可能为null的对象
     * @return    返回非null的字符串
     */
    public String nulTOstr(Object obj){
        String ret = "";
        if(obj instanceof String){
            ret = (String)obj;
        }
        return ret;
    }
    
    /**
     * 将null转换成空
     * @param obj 可能为null的对象
     * @return    返回非null的字符串
     */
    public String nul2blank(Object obj){
        String ret = "&nbsp;";
        if(obj instanceof String){
            ret = (String)obj;
            ret = ret.trim();
        }
        return ret;
    }
    
    /**
     * 判断字符串中是否包含script,update set,insert into等敏感单词
     * @param str 待检字符串
     * @return true：有敏感词 false：无敏感词
     */
    public static boolean isAttack(String str) {
        boolean res = false;
        if (null == str || "".equals(str.trim())) {
            return res;
        }
        Pattern p = Pattern.compile("\\b\\w*[Ss]\\s*[Cc]\\s*[Rr]\\s*[Ii]\\s*[Pp]\\s*[Tt]\\b|\\b[Ii]\\s*[Nn]\\s*[Ss]\\s*[Ee]\\s*[Rr]\\s*[Tt]\\s*[Ii]\\s*[Nn]\\s*[Tt]\\s*[Oo]\\b|\\b[Uu]\\s*[Pp]\\s*[Dd]\\s*[Aa]\\s*[Tt]\\s*[Ee][\\s\\w]*[sS]\\s*[Ee]\\s*[Tt]\\b");
        Matcher m = p.matcher(str);
        res = m.matches();
        return res;
    }
    
    /**
     * 判断字符串是否为数字
     * @param str
     * @return
     */
    public static boolean isNumeric(String str){ 
    	if (null == str || str.isEmpty()) return false;
    	
        Pattern pattern = Pattern.compile("[0-9]*"); 
        return pattern.matcher(str).matches();    
     } 
}
