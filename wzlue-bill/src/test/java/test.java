import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class test {

    public static void main(String[] args) {
//        String ids = "1,2,3";
////        List<String> strList = Arrays.asList(ids.split(","));
//        String[] split = ids.split(",");
//        System.out.println(Arrays.toString(split));
//        List<Integer> intList = new ArrayList<>();
//        for(String s:split){
//            Integer i = Integer.valueOf(s);
//            intList.add(i);
//        }
//        System.out.println(intList);

//        String url = "http://test-admin.suhangline.com/fileupload/20181227/8ff6af26-fde4-46f4-a222-c2b600b6db28.jpg";
//        String[] urls = url.split("/");
//        String picName = urls[urls.length-1];
//        System.out.println(picName);
        String url = "http://test-admin.suhangline.com/fileupload/20181227/8ff6af26-fde4-46f4-a222-c2b600b6db28.jpg";
        String picName = url.substring(url.length()-15);
        System.out.println(picName);
    }
}
