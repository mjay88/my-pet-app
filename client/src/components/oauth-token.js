const petFinderKey = "ssg62RKnSfXN0CwnanhRQRMwwwZTvuGnt8BE3th4ujwGKi3Dc4";
const petFinderSecret = "xCknCe8Vbez42FlMgPWdK95ngdg5G0lIMXSLB9FB";


const getToken = async (req, res) => {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", petFinderKey);
    params.append("client_secret", petFinderSecret);
    const petfinderRes = await fetch(
      "https://api.petfinder.com/v2/oauth2/token",
      {
        method: "POST",
        body: params,
      }
    );
    const data = await petfinderRes.json();
    res.send(data);
  };
  

export default getToken(); 