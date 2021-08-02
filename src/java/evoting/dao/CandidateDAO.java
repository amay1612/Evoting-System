 
package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.AddCandidateDto;
import evoting.dto.CandidateDTO;
import evoting.dto.CandidateDetails;
import evoting.dto.CandidateInfo;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;


public class CandidateDAO {
//     private static PreparedStatement ps,ps1,ps2,ps3,ps4,ps5;
//     private static Statement st;
//    static
//    {
//        try
//        {
//            st=DBConnection.getConnection().createStatement();
//            ps=DBConnection.getConnection().prepareStatement("Select max(candidate_id) from candidate");
//            ps1=DBConnection.getConnection().prepareStatement("Select username from user_details where adhar_no=?");
//            ps2=DBConnection.getConnection().prepareStatement("Select distinct city from user_details");
//            ps3=DBConnection.getConnection().prepareStatement("Insert into candidate values(?,?,?,?,?)");
//            ps4=DBConnection.getConnection().prepareStatement("select * from candidate where candidate_id=?");
//            
//            ps5=DBConnection.getConnection().prepareStatement("select candidate_id,username,party,symbol from candidate,user_details  where candidate.user_id=user_details.adhar_no and candidate.city=(select city from user_details where adhar_no=?)");
//           
//            
//            
//        }
//        catch(SQLException sql)
//        {
//            sql.printStackTrace();
//        }
//    }
//    public static String getNewId() throws SQLException
//    {
//        ResultSet rs=ps.executeQuery();
//        rs.next();
//        String cid=rs.getString(1);
//        if(cid==null)
//            return "C101";
//        else
//        {
//            int id=Integer.parseInt(cid.substring(1));
//            return "C"+(id+1);
//        }
//        
//        
//    }
//    public static String getUserNameById(String uid) throws SQLException
//    {
//        ps1.setString(1, uid);
//        ResultSet rs=ps1.executeQuery();
//         if(rs.next())
//         {
//             return rs.getString(1);
//         }
//         else
//             return null;
//    }
//    public static ArrayList<String> getCity() throws SQLException
//    {
//        ArrayList <String> cityList=new ArrayList<>();
//        ResultSet rs=ps2.executeQuery();
//        while(rs.next())
//        {
//            cityList.add(rs.getString(1));
//        }
//        return cityList;
//    }
//    public static boolean addCandidate(CandidateDTO obj) throws SQLException
//    {
//        ps3.setString(1,obj.getCandidateId());
//        ps3.setString(2, obj.getParty());
//        ps3.setString(3, obj.getUserid());
//        ps3.setBinaryStream(4, obj.getSymbol());
//        ps3.setString(5, obj.getCity());
//        return ps3.executeUpdate()!=0;
//    }
//    public static ArrayList<String> getCandidateId() throws SQLException
//    {
//        ArrayList <String> candidateIdList=new ArrayList<>();
//        ResultSet rs=st.executeQuery("select candidate_id from candidate");
//        while(rs.next())
//        {
//            candidateIdList.add(rs.getString(1));
//        }
//        return candidateIdList;
//    }
//    public static CandidateDetails getDetailsById(String cid) throws Exception
//    {
//        ps4.setString(1, cid);
//        ResultSet rs=ps4.executeQuery();
//        CandidateDetails cd=new CandidateDetails();
//        Blob blob;
//        InputStream inputStream;
//        byte[] imageBytes;
//        byte[] buffer;
//        int bytesRead;
//        String base64Image;
//        ByteArrayOutputStream outputStream;
//        if(rs.next())
//        {
//            blob=rs.getBlob(4);
//            inputStream=blob.getBinaryStream();
//            outputStream=new ByteArrayOutputStream();
//            buffer=new byte[4096];
//            while((bytesRead=inputStream.read(buffer))!=-1)
//            {
//                outputStream.write(buffer, 0, bytesRead);
//            }
//            imageBytes=outputStream.toByteArray();
//            Base64.Encoder en=Base64.getEncoder();
//            base64Image=en.encodeToString(imageBytes);
//            cd.setSymbol(base64Image);
//            cd.setCandidateId(cid);
//            cd.setCandidateName(getUserNameById(rs.getString(3)));
//            cd.setParty(rs.getString(2));
//            cd.setCity(rs.getString(5));
//            cd.setUserId(rs.getString(3));
//            
//        }
//        return cd;
//    }
//    public static ArrayList<CandidateInfo> viewCandidate(String adhar_id) throws Exception
//    {
//        ArrayList<CandidateInfo> candidateList=new ArrayList<CandidateInfo>();
//        ps5.setString(1, adhar_id);
//        ResultSet rs=ps5.executeQuery();
//        Blob blob;
//        InputStream inputStream;
//        byte[] imageBytes;
//        byte[] buffer;
//        int bytesRead;
//        String base64Image;
//        ByteArrayOutputStream outputStream;
//        while(rs.next())
//        {
//             blob=rs.getBlob(4);
//            inputStream=blob.getBinaryStream();
//            outputStream=new ByteArrayOutputStream();
//            buffer=new byte[4096];
//            while((bytesRead=inputStream.read(buffer))!=-1)
//            {
//                outputStream.write(buffer, 0, bytesRead);
//            }
//            imageBytes=outputStream.toByteArray();
//            Base64.Encoder en=Base64.getEncoder();
//            base64Image=en.encodeToString(imageBytes);
//            CandidateInfo cd=new CandidateInfo();
//            cd.setSymbol(base64Image);
//            cd.setCandidateId(rs.getString(1));
//            cd.setCandidateName(rs.getString(2));
//            cd.setParty(rs.getString(3));
//            candidateList.add(cd);
//            
//            
//        }
//        return candidateList;
//        
//    }
//    
    
     private static PreparedStatement ps,ps1,ps2,ps3,ps4,ps5,ps6,ps7,ps8,ps9,ps10,ps11;
    static{
        try{
    ps=DBConnection.getConnection().prepareStatement("select max(candidate_id) from candidate");
    ps1=DBConnection.getConnection().prepareStatement("select username from user_details where adhar_no=?");
    ps2=DBConnection.getConnection().prepareStatement("select distinct city from user_details");
    ps3=DBConnection.getConnection().prepareStatement("insert into candidate values(?,?,?,?,?)");
    ps4=DBConnection.getConnection().prepareStatement("select candidate_id from candidate");
    ps5=DBConnection.getConnection().prepareStatement("select * from candidate where candidate_id=?");
    ps6=DBConnection.getConnection().prepareStatement("delete from candidate where candidate_id=?");
    ps7=DBConnection.getConnection().prepareStatement("update candidate set party=?,symbol=?,city=? where candidate_id=?");
    ps8=DBConnection.getConnection().prepareStatement("select adhar_no from user_details where adhar_no not in(select userid from candidate)");
    ps9=DBConnection.getConnection().prepareStatement("select candidate_id from candidate where city=? and party=?");
    ps10=DBConnection.getConnection().prepareStatement("select symbol from candidate where party=?");   
    ps11=DBConnection.getConnection().prepareStatement("select candidate_id,username,party,symbol from candidate,user_details  where candidate.user_id=user_details.adhar_no and candidate.city=(select city from user_details where adhar_no=?)");
        }
        
        
        catch(SQLException sql){
            System.out.println(sql);
        }
}
    public static String getNewId()throws SQLException{
        ResultSet rs=ps.executeQuery();
        int id=1;
        rs.next();
        String ids=rs.getString(1);
        if(ids!=null){
        int sub=Integer.parseInt(ids.substring(1));
        id=sub+1;
        return "C"+id;
        }
        
        return "C101";
    }
    public static String getUserNameById(String id)throws SQLException{
        ps1.setString(1, id);
        ResultSet rs=ps1.executeQuery();
        if(rs.next()){
            return rs.getString(1);
        }
        return null;
    }
    public static ArrayList<String> getCity()throws SQLException{
        ArrayList<String> city=new ArrayList<>();
        ResultSet rs=ps2.executeQuery();
        while(rs.next()){
            city.add(rs.getString(1));
        }
        return city;
    }
    public static boolean addCandidate(CandidateDTO c)throws SQLException{
        ps3.setString(1,c.getCandidateId());
        ps3.setString(2,c.getParty());
        ps3.setString(3,c.getUserid());
        ps3.setBinaryStream(4,c.getSymbol());
        ps3.setString(5,c.getCity());
        return ps3.executeUpdate()==1;
    }
    public static ArrayList<String> getCandidateId()throws SQLException{
      ArrayList<String>list=new ArrayList();
      ResultSet rs=ps4.executeQuery();
      while(rs.next()){
          String id=rs.getString(1);
          list.add(id);
      }
      return list;
    }
    public static CandidateDetails getDetailsById(String cid)throws Exception{
      ps5.setString(1, cid);
      CandidateDetails c=new CandidateDetails();
      ResultSet rs=ps5.executeQuery();
      InputStream ip=null;
      ByteArrayOutputStream outputStream=new ByteArrayOutputStream();
      byte[]buffer;
      int byteRead;
      byte[]img;
      String base64img;
      if(rs.next()){
          c.setCandidateId(rs.getString(1));
          c.setParty(rs.getString(2));
          c.setUserId(rs.getString(3));
          c.setCity(rs.getString(5));
          c.setCandidateName(getUserNameById(rs.getString(3)));
          Blob b=rs.getBlob(4);//1 step to reatrive img
          ip=b.getBinaryStream();//getBinaryStram convert img to inptSream
          buffer =new byte[24096];//creating byte array step 3
          byteRead=-1;
          while((byteRead=ip.read(buffer))!=-1){//step 4
              outputStream.write(buffer,0, byteRead);//step 5
          }
          img=outputStream.toByteArray();//step 6
          Base64.Encoder en=Base64.getEncoder();//creating encoder object
          base64img=en.encodeToString(img);//by calling encodeToString return string form of img array
          c.setSymbol(base64img);
          
      }
      return c;
    }
    public static boolean deleteCandidate(String cid)throws SQLException{
        ps6.setString(1, cid);
       return ps6.executeUpdate()==1;
    }
     public static boolean updateCandidate(CandidateDTO c)throws SQLException{
        ps7.setString(1,c.getParty());
        ps7.setBinaryStream(2,c.getSymbol());
        ps7.setString(3,c.getCity());
        ps7.setString(4,c.getCandidateId());
        return ps7.executeUpdate()==1;
    } 
     public static ArrayList<String> getUserID()throws SQLException{
        ArrayList<String> userid=new ArrayList<>();
        ResultSet rs=ps8.executeQuery();
        while(rs.next()){
            userid.add(rs.getString(1));
        }
        return userid;
    }
     public static String checkParty(String city,String party)throws SQLException{
         ps9.setString(1, city);
         ps9.setString(2,party);
         ResultSet rs=ps9.executeQuery();
         if(rs.next()){
             return rs.getString(1);
         }
         return null;
     }
     public static String getSymbol(String party)throws Exception{
        ps10.setString(1, party);
        ResultSet rs=ps10.executeQuery();
        if(rs.next()){
            Blob b=rs.getBlob(1);
            InputStream ip=b.getBinaryStream();
            byte []buffer=new byte[20496];
            int byteRead=-1;
            ByteArrayOutputStream outputStream=new ByteArrayOutputStream();
            while((byteRead=ip.read(buffer))!=-1){
                outputStream.write(buffer,0,byteRead);
            }
            byte[]img=outputStream.toByteArray();
            Base64.Encoder en=Base64.getEncoder();
           return en.encodeToString(img);
        }
        return null;
    }
      public static ArrayList<CandidateInfo> viewCandidate(String adhar_id) throws Exception
    {
        ArrayList<CandidateInfo> candidateList=new ArrayList<CandidateInfo>();
        ps11.setString(1, adhar_id);
        ResultSet rs=ps11.executeQuery();
        Blob blob;
        InputStream inputStream;
        byte[] imageBytes;
        byte[] buffer;
        int bytesRead;
        String base64Image;
        ByteArrayOutputStream outputStream;
        while(rs.next())
        {
             blob=rs.getBlob(4);
            inputStream=blob.getBinaryStream();
            outputStream=new ByteArrayOutputStream();
            buffer=new byte[4096];
            while((bytesRead=inputStream.read(buffer))!=-1)
            {
                outputStream.write(buffer, 0, bytesRead);
            }
            imageBytes=outputStream.toByteArray();
            Base64.Encoder en=Base64.getEncoder();
            base64Image=en.encodeToString(imageBytes);
            CandidateInfo cd=new CandidateInfo();
            cd.setSymbol(base64Image);
            cd.setCandidateId(rs.getString(1));
            cd.setCandidateName(rs.getString(2));
            cd.setParty(rs.getString(3));
            candidateList.add(cd);
            
            
        }
        return candidateList;
        
    }
    
}
