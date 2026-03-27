const ACCESS_KEY = "T2WWIpMlkWEIvMgUSddGDgtyEbrft7qZJD0y0cZlNwk";

export async function getCarImages(carName) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${carName} car&per_page=6&client_id=${ACCESS_KEY}`
  );

  const data = await res.json();

  return data.results.map(img => img.urls.regular);
}
