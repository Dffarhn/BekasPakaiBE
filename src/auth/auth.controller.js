import authService from "./auth.service.js";

class AuthController {
  async register(req, res) {
    try {
      const newUser = await authService.register(req.body);
      res.status(201).json({ pesan: "Registrasi berhasil", user: newUser });
    } catch (error) {
      res.status(500).json({ pesan: "Terjadi kesalahan saat registrasi" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      if (result.success) {
        res.json({ pesan: "Login berhasil", token: result.token });
      } else {
        res.status(401).json({ pesan: "Email atau password salah" });
      }
    } catch (error) {
      res.status(500).json({ pesan: "Terjadi kesalahan saat login" });
    }
  }
}

export default new AuthController();
