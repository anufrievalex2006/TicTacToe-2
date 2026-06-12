import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.SQLException;

public class VulnerableExample {

    public void getUser(Connection conn, String userId) throws SQLException {
        String query = "SELECT * FROM users WHERE id = '" + userId + "'";
        conn.createStatement().execute(query);
    }

    String password = "supersecret123";

    public byte[] hash(String input) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        return md.digest(input.getBytes());
    }
}