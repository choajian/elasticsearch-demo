package com.cj.mongoindex.search.utils;

import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class CommUtil {
	
	/**
	 * 使用17位日期时间加4位流水号创建一个至少21位的主键值
	 * 
	 * @param len
	 *            主键位数，必须在21~32之间，否则返回的主键只有20位
	 * @return 返回主键
	 */
	public synchronized static String getKey(int len) {

		StringBuffer ret = new StringBuffer(32);
		dfDate.setLenient(false);
		ret.append(dfDate.format(new java.util.Date()));

		ret.append(dfSerialNumFour.format(serial++));
		if (serial >= 10000)
			serial = 0;

		if (len > 21 && len < 33) {
			int seed = Integer.valueOf(ret.substring(15, 18)).intValue();
			java.util.Random random = new java.util.Random(seed);
			String ran = dfRandomNum.format(Math.abs(random.nextLong()));
			ret.append(ran.substring(0, len - 21));
		}
		return ret.toString();
	}

	/** 最大三位的流水号 */
	private static int serial = 0;
	/** 日期生成字符串格式 */
	private static SimpleDateFormat dfDate = new SimpleDateFormat(
			"yyyyMMddHHmmssSSS"); // yyyy-MM-dd HH:mm:ss.SSS
	/** 二位流水号生成字符串格式 */
	private static DecimalFormat dfSerialNumTwo = new DecimalFormat("00");
	/** 三位流水号生成字符串格式 */
	//private static DecimalFormat dfSerialNumThree = new DecimalFormat("000");
	/** 四位流水号生成字符串格式 */
	private static DecimalFormat dfSerialNumFour = new DecimalFormat("0000");
	/** 随机数生成字符串格式 */
	private static DecimalFormat dfRandomNum = new DecimalFormat("00000000000");

	/**
	 * 使用17位日期时间加3位流水号创建一个20位的主键值
	 * 
	 * @return 返回主键
	 */
	public synchronized static String getKey() {

		StringBuffer ret = new StringBuffer(19);
		dfDate.setLenient(false);
		ret.append(dfDate.format(new java.util.Date()));

		ret.append(dfSerialNumTwo.format(serial++));
		if (serial >= 100)
			serial = 0;

		return ret.toString();
	}

	/**
	 * 返回错误的堆栈信息
	 * 
	 * @param e
	 *            错误对象
	 * @param message
	 *            是否返回错误描述
	 * @return 返回堆栈信息
	 */
	public static String getStackTraceInfo(Exception e, boolean message) {
		StringBuffer buf = new StringBuffer("");
		if (message) {
			buf.append(e.getMessage());
		}
		StackTraceElement stack[] = e.getStackTrace();
		for (int i = 0; i < stack.length; i++) {
			buf.append("\n\t").append(stack[i].toString());
		}
		return buf.toString();
	}

	/**
	 * <pre>
	 *     卸载Session中的所有信息并使Session失效。
	 * </pre>
	 * 
	 * @param request
	 *            请求对象
	 */
	public static void destroyTempSession(HttpServletRequest request, String key) {
		HttpSession httpSession = request.getSession();
		if (httpSession != null) {
			String linked = (String) httpSession.getAttribute(key);
			if (linked != null && linked.equals("true")) {
				httpSession.setAttribute(key, null);
				httpSession.invalidate();
			}
		}
	}

	/**
	 * 将对象转换成数值
	 * 
	 * @param val
	 *            对象
	 * @param def
	 *            默认值
	 * @return 数值
	 */
	public static int changeStringToInt(Object val, int def) {
		int ret = def;
		try {
			if (val != null && !val.equals("")) {
				ret = Integer.valueOf(String.valueOf(val).trim()).intValue();
			}
		} catch (Exception e) {
			e.printStackTrace();
			ret = def;
		}
		return ret;
	}

	/**
	 * 过滤html脚本中的特殊字符
	 * 
	 * @param strInfo
	 *            html脚本
	 * @return 过滤后的脚本
	 */
	public static String filterHtml(String strInfo) {
		if (strInfo == null)
			return "";
		strInfo = strInfo.replaceAll("&", "&amp;");
		strInfo = strInfo.replaceAll(">", "&gt;");
		strInfo = strInfo.replaceAll("<", "&lt;");
		strInfo = strInfo.replaceAll("\"", "&quot;");
		return strInfo;
	}
	
	/**
     * 得到uuid
     * @return
     */
    public static String getUUID() {
    	return UUID.randomUUID().toString();
    }
    
    /**
	 * 判断链接是否有效
	 * @param strLink 输入链接
	 * @return 返回true或者false
	 */
	public static boolean isValid(String strLink) 
	{
		URL url;
		try 
		{
			url = new URL(strLink);
			HttpURLConnection connt = (HttpURLConnection) url.openConnection();
			connt.setRequestMethod("HEAD");
			String strMessage = connt.getResponseMessage();
			if (strMessage.compareTo("Not Found") == 0) 
			{
				return false;
			}
			connt.disconnect();
		} 
		catch (Exception e) 
		{
			return false;
		}
		return true;
	}
	
	/**
	 * 获取当前年份与前三年的集合
	 * @return
	 */
	public static List<Integer> currentYearArray(){
		Calendar a=Calendar.getInstance();
		List<Integer> yearArray=new ArrayList<Integer>();
		int year=a.get(Calendar.YEAR);
		yearArray.add(year);
		yearArray.add(year-1);
		yearArray.add(year-2);
		yearArray.add(year-3);
		return yearArray;
		
	}
	
	/**
	 * 使用正则表达式进行表单验证
	 * @param str
	 * @param regex
	 * @return
	 */
	public static boolean check(String str, String regex) {
		boolean flag = false;
		try {
		     Pattern pattern = Pattern.compile(regex);
		     Matcher matcher = pattern.matcher(str);
		     flag = matcher.matches();
		} catch (Exception e) {
		     flag = false;
		}
		return flag;
    }

	
	 /**
     * 验证手机号码
     * 
     * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、178、182、183、187、188、147
     * 联通号码段:130、131、132、155、156、185、186、145、176
     * 电信号码段:133、153、177、180、181、189
     * 
     * @param cellphone
     * @return
     */
    public static boolean checkCellphone(String cellphone) {
    	String regex = "^(1)\\d{10}$"; 
		//String regex = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0,6-8]))|(18([0-1]|[5-9])))\\d{8}$"; 
		return check(cellphone, regex);
    }
    
}
