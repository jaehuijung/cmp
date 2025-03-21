package sl.qr.mh.service.common;

import javax.crypto.SecretKey;
import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class FileKeyManager {
    public static SecretKey loadKey(String filePath) throws Exception {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filePath))) {
            return (SecretKey) ois.readObject();
        }
    }
}
