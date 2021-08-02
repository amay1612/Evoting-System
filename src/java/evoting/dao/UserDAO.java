
package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.CandidateDTO;
import evoting.dto.UserDTO;
import evoting.dto.VoteDTO;
import evoting.dto.UserDetails;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;


public class UserDAO {
    private static PreparedStatement psa,ps,ps1,ps2,ps3,ps4,ps5;
    static
    {
        try
        {
            psa=DBConnection.getConnection().prepareStatement("Select user_type from user_details where adhar_no=? and password=?");
           ps=DBConnection.getConnection().prepareStatement("select * from user_Details where adhar_no=?");
    ps1=DBConnection.getConnection().prepareStatement("insert into user_Details values(?,?,?,?,?,?,?,?)");
    ps2=DBConnection.getConnection().prepareStatement("select * from  user_Details where user_type='Voter'");
    ps3=DBConnection.getConnection().prepareStatement("delete from user_details  where adhar_no=?");
    ps4=DBConnection.getConnection().prepareStatement("select adhar_no from user_details where user_type='Voter'");
    ps5=DBConnection.getConnection().prepareStatement("select * from user_details where adhar_no=? and user_type='Voter'");
       
            
        }
        catch(SQLException sql)
        {
            sql.printStackTrace();
        }
    }
    
    public static String validateUser(UserDTO user) throws SQLException
    {
        psa.setString(1, user.getUserid());
        psa.setString(2, user.getPassword());
        System.out.println("===================================");
        System.out.println("User id :"+user.getUserid());
        System.out.println("Password : "+user.getPassword());
        System.out.println("===================================");
        ResultSet rs=psa.executeQuery();
        if(rs.next())
        {
            System.out.println(rs.getString(1));
            return rs.getString(1); 
        }
        return null;
    }
    public static boolean search(String id)throws SQLException{
        ps.setString(1,id);
        return ps.executeQuery().next();
    }
    public static boolean register(UserDetails u)throws SQLException{
        ps1.setString(1,u.getUserid());
        ps1.setString(2,u.getPassword());
        ps1.setString(3,u.getUsername());
        ps1.setString(4,u.getAddress());
        ps1.setString(5,u.getCity());
        ps1.setString(6,u.getEmail());
        ps1.setLong(7,u.getMobile());
        ps1.setString(8,"Voter");
        
        int i=ps1.executeUpdate();
        if(i==1)
            return true;
        return false;
    }
    public static ArrayList<UserDetails>showUsers()throws SQLException{
        ArrayList<UserDetails>list=new ArrayList();
        ResultSet rs=ps2.executeQuery();
        while(rs.next()){
            UserDetails user=new UserDetails();
            user.setUserid(rs.getString(1));
            user.setPassword(rs.getString(2));
            user.setUsername(rs.getString(3));
            user.setAddress(rs.getString(4));
            user.setCity(rs.getString(5));
            user.setEmail(rs.getString(6));
            user.setMobile(rs.getLong(7));
            
            list.add(user);
        }
        return list;
    }
    public static ArrayList<String>getAllUserId()throws SQLException{
       ResultSet rs=ps4.executeQuery();
       ArrayList<String>list=new ArrayList<>();
       while(rs.next()){
           list.add(rs.getString(1));
       }
       return list;
    }
    public static UserDetails showUserDetails(String uid)throws SQLException{
        //ArrayList<UserPojo>list=new ArrayList();
        ps5.setString(1, uid);
        ResultSet rs=ps5.executeQuery();
        UserDetails user=new UserDetails();
        if(rs.next()){
            
            user.setUserid(rs.getString(1));
            user.setPassword(rs.getString(2));
            user.setUsername(rs.getString(3));
            user.setAddress(rs.getString(4));
            user.setCity(rs.getString(5));
            user.setEmail(rs.getString(6));
            user.setMobile(rs.getLong(7));
            
        }
        return user;
    }
    public static boolean deleteUser(String uid)throws SQLException{
        ps3.setString(1, uid);
        return ps3.executeUpdate()==1;
    }
   
}
