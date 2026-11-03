# MICAN Local Exam starter
This is a starter local-network exam server. It serves student and admin pages, keeps correct answers on the server, grades submissions locally, and stores results in `data.json`.

## Run
1. Install Node.js LTS on a laptop/mini-PC.
2. Extract the ZIP and open a terminal in this folder.
3. Run `npm install`.
4. Set a strong admin password:
   - Windows PowerShell: `$env:MICAN_ADMIN_PASSWORD="your-strong-password"`
   - macOS/Linux: `export MICAN_ADMIN_PASSWORD="your-strong-password"`
5. Run `npm start`.
6. Open `http://localhost:3000` on the server.
7. Find that device's local Wi-Fi IP (example `192.168.1.20`). Students browse to `http://192.168.1.20:3000`.

## Network choices
The dashboard contains both Samsung phone hotspot and Wi-Fi router choices. No router ID is needed. Connect the server device and all student laptops to the same network. A phone hotspot may limit connected devices or isolate them from one another. For 100 laptops, use a capable Wi-Fi 5/6 access point/router and preferably a laptop/mini-PC as the local server. The phone can control the admin dashboard.

## Before a real exam
This is a prototype, not yet load-tested or security-audited for 100 simultaneous users. Test with the actual router and devices. Change the default password, keep the server physically secure, and back up `data.json`. Internet is not needed during an exam on the same local network.
