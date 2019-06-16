package com.cj.mongoindex.mongodb.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * 文本工具类
 * 
 * @author 晁建
 *
 * @version 0.1 初始版本
 * @version 0.2 修复正则表达式错误
 *
 */
public class StringUtil {
	// 格式化日期字符串
	public static SimpleDateFormat formatDate = new SimpleDateFormat("yyyyMMdd");

	/**
	 * String(html) 转为json特殊字符处理
	 * 
	 * @param s
	 * @return
	 */
	public static String String2Json(String s) {
		StringBuffer sb = new StringBuffer();
		if (null != s && !"".equals(s)) {
			for (int i = 0; i < s.length(); i++) {
				char c = s.charAt(i);
				switch (c) {
				case '\"':
					sb.append("\\\"");
					break;
				case '\\':
					sb.append("\\\\");
					break;
				case '/':
					sb.append("\\/");
					break;
				case '\b':
					sb.append("\\b");
					break;
				case '\f':
					sb.append("\\f");
					break;
				case '\n':
					sb.append("\\n");
					break;
				case '\r':
					sb.append("\\r");
					break;
				case '\t':
					sb.append("\\t");
					break;
				default:
					sb.append(c);
				}
			}
		}
		return sb.toString();
	}

	/**
	 * 正则表达式过滤
	 * 
	 * @param inputString
	 * @return
	 */
	public static String regexEscape(String inputString) {
		String htmlStr = inputString; // 含html标签的字符串
		String textStr = "";
		Pattern p_regex;
		Matcher m_regex;

		try {
			String regEx_regex = "[\\*\\.\\?\\+\\$\\^\\[\\]\\(\\)\\{\\}\\|\\/]";
			p_regex = Pattern.compile(regEx_regex, Pattern.CASE_INSENSITIVE);
			m_regex = p_regex.matcher(htmlStr);
			htmlStr = m_regex.replaceAll("\\\\$0");

			textStr = htmlStr;

		} catch (Exception e) {
			System.err.println("regexEscape: " + e.getMessage());
		}

		return textStr;// 返回文本字符串
	}

	/**
	 * html过滤标签
	 * 
	 * @param inputString
	 * @return
	 */
	public static String Html2Text2(String inputString) {
		String htmlStr = inputString; // 含html标签的字符串
		String textStr = "";
		Pattern p_script;
		Matcher m_script;
		Pattern p_style;
		Matcher m_style;

		try {
			String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>|<[\\s]*?script[^>]*?>[\\s\\S]*"; // 定义script的正则表达式{或<script[^>]*?>[//s//S]*?<///script>
			String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; // 定义style的正则表达式{或<style[^>]*?>[//s//S]*?<///style>
			p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
			m_script = p_script.matcher(htmlStr);
			htmlStr = m_script.replaceAll(""); // 过滤script标签

			p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
			m_style = p_style.matcher(htmlStr);
			htmlStr = m_style.replaceAll(""); // 过滤style标签

			textStr = htmlStr;

		} catch (Exception e) {
			System.err.println("Html2Text: " + e.getMessage());
		}

		return textStr;// 返回文本字符串
	}

	/**
	 * html过滤标签
	 * 
	 * @param inputString
	 * @return
	 */
	public static String Html2Text(String inputString) {
		String htmlStr = inputString; // 含html标签的字符串
		String textStr = "";
		Pattern p_script;
		Matcher m_script;
		Pattern p_style;
		Matcher m_style;
		Pattern p_html;
		Matcher m_html;

		Pattern p_content;
		Matcher m_content;
		Pattern p_flag;
		Matcher m_flag;

		try {
			String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*<[\\s]*?\\/[\\s]*?script[\\s]*?>|<[\\s]*?script[^>]*?>[\\s\\S]*"; // 定义script的正则表达式{或<script[^>]*?>[//s//S]*?<///script>
			String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; // 定义style的正则表达式{或<style[^>]*?>[//s//S]*?<///style>
			String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式
			String regEx_content = "</adress>|</caption>|</dd>|</dt>|</dl>|</div>|</form>|</h1>|</h2>|</h3>|</h4>|</h5>|</h6>|</h7>|</ol>|</li>|</ul>|</p>|</table>|</td>|</tr>|</th>|</br>|<br>|<BR>+";
			String regEx_flag = "&nbsp;|&rdquo;|&ldquo;|&mdash;|&ensp;|&emsp;|&emsp;|&gt;|&amp;|&quot;|&copy;|&reg;|&times;|&divide;+";
			p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
			m_script = p_script.matcher(htmlStr);
			htmlStr = m_script.replaceAll(""); // 过滤script标签

			p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
			m_style = p_style.matcher(htmlStr);
			htmlStr = m_style.replaceAll(""); // 过滤style标签

			p_flag = Pattern.compile(regEx_flag, Pattern.CASE_INSENSITIVE);
			m_flag = p_flag.matcher(htmlStr);
			htmlStr = m_flag.replaceAll(" "); // 过滤特殊标记

			p_content = Pattern
					.compile(regEx_content, Pattern.CASE_INSENSITIVE);
			m_content = p_content.matcher(htmlStr);
			htmlStr = m_content.replaceAll("\n"); // 过滤特殊标记

			p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
			m_html = p_html.matcher(htmlStr);
			htmlStr = m_html.replaceAll(""); // 过滤html标签

			textStr = htmlStr;

		} catch (Exception e) {
			System.err.println("Html2Text: " + e.getMessage());
		}
		return textStr;// 返回文本字符串
	}

	/**
	 * clob转换为String
	 * 
	 * @param clob
	 * @return
	 */
	public static String ClobtoString(Clob clob) {
		String reString = "";
		Reader is = null;
		if (clob == null) {
			return "";
		}
		try {
			is = clob.getCharacterStream();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// 得到流
		BufferedReader br = new BufferedReader(is);
		String s = null;
		try {
			s = br.readLine();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		StringBuffer sb = new StringBuffer();
		while (s != null) {
			// 执行循环将字符串全部取出付值给StringBuffer由StringBuffer转成STRING
			sb.append(s);
			try {
				s = br.readLine();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		reString = sb.toString();
		return reString;
	}

	/**
	 * 如果域名不存在获取域名
	 * 
	 * @param site
	 * @param url
	 * @return
	 */
	public static String GetDomainName(String site, String url) {
		if (site == null || site.length() == 0) {
			if (url == null || url.length() == 0) {
				return "";
			}
			String regEx = "[^//]*?\\.(com|cn|net|org|biz|info|cc|tv)"; // 定义
			Pattern pattern = Pattern.compile(regEx, Pattern.CASE_INSENSITIVE);
			Matcher matcher = pattern.matcher(url);
			if (matcher.find())
				return matcher.group();
		}
		return site;
	}

	/**
	 * 按字节截取字符串
	 * 
	 * @param str
	 * @param len
	 * @return
	 */
	public static String subStringByByte(String str, int len) {
		String result = null;
		if (str != null) {
			byte[] a = str.getBytes();
			if (a.length <= len) {
				result = str;
			} else if (len > 0) {
				result = new String(a, 0, len);
				int length = result.length();
				if (str.charAt(length - 1) != result.charAt(length - 1)) {
					if (length < 2) {
						result = null;
					} else {
						result = result.substring(0, length - 1);
					}
				}
			}
		}
		return result;
	}

	/**
	 * 特殊字符过滤
	 * 
	 * @param inputString
	 * @return
	 */
	public static String Html2TextSpecial(String inputString) {
		String htmlStr = inputString; // 含html标签的字符串
		String textStr = "";
		Pattern p_special;
		Matcher m_special;

		try {
			String regEx_script = "&nbsp;|&rdquo;|&ldquo;|&mdash;|&ensp;|&emsp;|&emsp;|&gt;|&amp;|&quot;|&copy;|&reg;|&times;|&divide;+";
			p_special = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
			m_special = p_special.matcher(htmlStr);
			htmlStr = m_special.replaceAll(""); // 过滤字符

			textStr = htmlStr;

		} catch (Exception e) {
			System.err.println("Html2TextSpecial: " + e.getMessage());
		}

		return textStr;// 返回文本字符串
	}

	/**
	 * 格式化时间字符串
	 * 
	 * @param d
	 * @return
	 */
	public static String dateFormat(String d) {
		Pattern p;
		Matcher m;
		String reg = "\\b(\\d*)[-\\./年](\\d*)[-\\./月](\\d*)\\b";
		StringBuffer f = new StringBuffer();
		String year = "";
		String mon = "";
		String day = "";

		if (d != null && !"".equals(d)) {
			p = Pattern.compile(reg);
			m = p.matcher(d);
			while (m.find()) {
				year = m.group(1);
				mon = m.group(2);
				mon = mon.length() == 1 ? "0" + mon : mon;
				day = m.group(3);
				day = day.length() == 1 ? "0" + day : day;
			}

			f.append(year);
			f.append("-");
			f.append(mon);
			f.append("-");
			f.append(day);
		}

		return f.toString();
	}

	// 过滤特殊字符
	public static String StringFilter(String str) throws PatternSyntaxException {
		// 只允许字母和数字
		// String regEx = "[^a-zA-Z0-9]";
		// 清除掉所有特殊字符
		String regEx = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(str);
		return m.replaceAll("").trim();
	}
	
	public static String HanziFilter(String str){
		Pattern p = Pattern.compile("\\n", Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(str);
		str = m.replaceAll("");
		p = Pattern.compile("[^\\u4e00-\\u9fa5|\\d|\\w]+", Pattern.CASE_INSENSITIVE);
		m = p.matcher(str);
		str = m.replaceAll("");
		return str;
	}
	
	public static String replace(String str){
		Pattern p = Pattern.compile("\\n", Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(str);
		str = m.replaceAll("");
		p = Pattern.compile("[\\s]+", Pattern.CASE_INSENSITIVE);
		m = p.matcher(str);
		str = m.replaceAll("");
		return str;
	}

	public static void main(String[] args) throws PatternSyntaxException {
		String str = "你好\n晁建";
		System.out.println(replace(str));
	}
}