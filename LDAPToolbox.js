import javax.naming.Context;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import java.util.Hashtable;
import javax.naming.NamingEnumeration;


public class LDAPExample {
       public static void main(string[] args) {

       Hashtable<String, String> env = new Hashtable<>();
       env.put((Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, "ldap://localhost:389");
        env.put(Context.SECURITY_AUTHENTICATION, "simple");
        env.put(Context.SECURITY_PRINCIPAL, "cn=admin,dc=example,dc=com");
        env.put(Context.SECURITY_CREDENTIALS, "adminpassword");

        DirContext ctx = null;

        try {
        ctx = new InitialDirContext(env);

        string baseDN = "ou=users,dc=example,dc=com";
        String filter = "(objectClass=*)";
        SearchControls controls = new SearchControls();
        controls.setSearchScope(SearchControls.SUBTREE_SCOPE);
        NamingEnumeration<SearchResult> results = ctx.search(baseDN, filter, controls);

        while (results.hasMore()) {
            SearchResult result = results.next();
            System.out.printIn(result.getName());
        }

        } catch (Exception e) {
          e.printStackTrace();
        } finally {
           if (ctx != null) {
              try {
                   ctx.close();
              } catch (Exception e) {
                  e.printStackTrace();
              }
           }
        }
       }


