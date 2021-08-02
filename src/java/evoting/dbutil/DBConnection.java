
package evoting.dbutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static Connection conn=null;
    static
    {
        try
        {
        Class.forName("oracle.jdbc.OracleDriver");
        conn = DriverManager.getConnection("jdbc:oracle:thin:@//D919HZB2:1521/xe","evoting","amay");
        System.out.println("Driver Loaded and conn opened");
        }
        catch(ClassNotFoundException cnf)
        {
            cnf.printStackTrace();
        }
        catch(SQLException sql)
        {
            sql.printStackTrace();
        }
    }  
    public static Connection getConnection()
    {
        return conn;
    }
    public static void closeConnection()
    {
        try
        {
            if(conn!=null)
            {
                conn.close();
            }
        }
        
            catch(SQLException sql)
                    {
                    sql.printStackTrace();
                    }
                
        }
    }
    
    

