export const api_key = '09a131a182323eb5a5746cff3f01e917';
export const imgUrl = 'https://image.tmdb.org/t/p/w500';

export const useGenres = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";

    const genreIds = selectedGenres.map((g) => g.id);
    return genreIds.reduce((acc, curr) => acc + "," + curr)
};