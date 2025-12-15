Papa.parse("./lib/data/movie_data.csv", {
    download: true,
    header: true,
    complete: function(results) {
        const data = results.data;
        console.log(data);
       
        const locationOfChart = document.getElementById('myChart');
 
 
  new Chart(locationOfChart, {
    type: 'bar',
    data: {
        // x axis
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Magenta'],
      datasets: [{
        label: 'Color Frequency',
 
 
        //y axis- data
        data: [12, 19, 3, 5, 2, 3, 25],
        borderWidth: 3,
        backgroundColor: 'green'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
 
 
    const topTenMoviesChart = document.getElementById('movieRatingBarChart');
 
 
    //goes through the dataset and excludes movies without a rating or title
    const moviesWithData = data.filter(function(movie){
        return movie.rating && movie.title;
 
 
    });
  
    //sort the dataset by highest rating first
    const sortedMovies = moviesWithData.sort(function(a,b){
        return parseFloat(b.rating) -parseFloat(a.rating);
 
 
    });
 
 
    const top10Movies = sortedMovies.slice(0,10);
  
    console.log(top10Movies);
 
 
 
 
    new Chart(topTenMoviesChart, {
        type: 'bar',
        data: {
            // x axis
          labels: top10Movies.map(movie => movie.title),
          datasets: [{
            label: 'Top 10 Movies By Rating',
   
            //y axis- data
            data: top10Movies.map(movie => movie.rating),
            borderWidth: 2,
            backgroundColor: 'lightblue',
            borderColor: "grey"
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
   
 
 
        const topGenrePieChart = document.getElementById('genrePieChart');
 
 
        const genreCounts = {};
 
 
        for (let i= 0; i<data.length; i++){
            let currentGenres = data[i].genre.split(",");
            for (let j= 0; j< currentGenres.length; j++) {
                let currentGenre = currentGenres[j];
               
                if (genreCounts[currentGenre] == null ){
                    genreCounts[currentGenre] = 1;
 
 
                } else{
                    genreCounts[currentGenre] += 1;
 
 
            }
 
 
        }
    }
        console.log(genreCounts);
 
 
        const pieLabels = Object.keys(genreCounts);
        //console.log(pieLabels);
        const pieData = pieLabels.map(genre => genreCounts[genre]);
       // console.log(pieData);
 
 
       const backgroundColors = [
            "red",
            "blue",
            "green",
            "yellow",
            "lightblue",
            "grey",
            "pink",
            "orange",
       ]
 
 
        new Chart(topGenrePieChart, {
            type: 'pie',
            data: {
                // x axis
              labels: pieLabels,
              datasets: [{
                label: 'Color Frequency',
       
                //y axis- data
                data: pieData,
                borderWidth: 3,
                backgroundColor: backgroundColors
              }]
            },
            options: {
            plugins: {
                title: {
                    display: true,
                    text: "Top Genres Pie Chart"
                }
            }
              
 
 
              }
           
          });
 
 
    const avgLineChart = document.getElementById('averageRatingLineChart');
 
 
    const ratingByYear = {};
    const movieCountByYear = {};
 
 
    for (let i=0; i<data.length; i++){
        if (data[i].year == null || data[i].rating == null){
            continue;
        }
 
 
        const year= parseInt(data[i].year);
        const rating = parseInt(data[i].rating);
 
 
        if (ratingByYear[year] == null){
            ratingByYear[year] = 0;
            movieCountByYear[year] = 0;
 
 
        }
 
 
        ratingByYear[year]+= rating;
        movieCountByYear[year] += 1;
    }
    console.log(ratingByYear);
    console.log(movieCountByYear);
 
 
     const years = Object.keys(ratingByYear);
     const yearsSorted = years.sort((a,b) => parseInt(a) - parseInt(b));
     const avgRatings= yearsSorted.map(year => ratingByYear[year]/movieCountByYear[year]);
 
 
  
    new Chart(avgLineChart, {
        type: 'line',
        data: {
            // x axis
          labels: yearsSorted,
          datasets: [{
            label: 'Color Frequency',
   
            //y axis- data
            data: avgRatings,
            borderWidth: 3,
            backgroundColor: 'green'
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
 })
 