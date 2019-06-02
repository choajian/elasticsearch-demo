package com.cj.mongoindex.mongodb.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期格式化工具
 */
public class DateUtils {
    //日期格式化
    static SimpleDateFormat sdFormat = new SimpleDateFormat("yyyy-MM-dd");

    /**
     * 获取当前日期
     * @return
     */
    public static String getCurDate(){
        Date curDate=new Date();
        return sdFormat.format(curDate);
    }

    /**
     * 获取当前日期
     * @return
     */
    public static String dateToStr(Date d){
        return sdFormat.format(d);
    }

    /**
     * 一年前的今天
     * @return
     */
    public static String getAgo(){
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.YEAR, -1);
        Date y = c.getTime();
        String year = sdFormat.format(y);
        return year;
    }

    /**
     * 根据当前时间，添加或减去指定的时间量。例如，要从当前日历时间减去 5 天，可以通过调用以下方法做到这一点：
     * add(Calendar.DAY_OF_MONTH, -5)。
     * @param date 指定时间
     * @param num  为时间添加或减去的时间天数
     * @return
     */
    public static Date getBeforeOrAfterDate(Date date, int num) {
        Calendar calendar = Calendar.getInstance();//获取日历
        calendar.setTime(date);//当date的值是当前时间，则可以不用写这段代码。
        calendar.add(Calendar.DATE, num);
        Date d = calendar.getTime();//把日历转换为Date
        return d;
    }
}
