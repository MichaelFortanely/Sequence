export function ExamineWin(colorNum, grid) {
    // //check all of the row wins
    for(let i = 0; i < 10; i += 1){
        for(let j = 0; j < 6; j += 1){
            let found = true
            for(let k = 0; k < 5; k += 1){
                if(colorNum !== grid[i][j + k] && grid[i][j + k] !== -1){
                    found = false
                    break
                }
            }
            if(found){
                return true
            }
        }
    }

    //  //check all of the column wins
     for(let i = 0; i < 10; i += 1){
        for(let j = 0; j < 6; j += 1){
            let found = true
            for(let k = 0; k < 5; k += 1){
                if(colorNum !== grid[j + k][i] && grid[j + k][i] !== -1){
                    found = false
                    break
                }
            }
            if(found){
                return true
            }
        }
    }

    // //diagonal wins
    // //slant to upper left
    for(let i = 0; i < 6; i += 1){
        for(let j = 0; j < 6; j += 1){
            for(let k = 0; k < 6 - Math.max(i, j); k += 1){
                let found = true
                for(let m = 0; m < 5; m += 1){
                    if(colorNum !== grid[i + k + m][j + k + m] && grid[i + k + m][j + k + m] !== -1){
                        found = false
                        break
                    }
                }
                if(found){
                    return true
                }
            }
        }
    }

    // //slant to upper right
    for(let i = 4; i < 10; i += 1){//columns
        for(let j = 0; j < 6; j += 1){//rows
            for(let k = 0; k < Math.min(i - 3, 6 - j * 1); k += 1){
                let found = true
                for(let m = 0; m < 5; m += 1){
                    if(colorNum !== grid[j + k + m][i - k - m] && grid[j + k + m][i - k - m] !== -1){
                        found = false
                        break
                    }
                }
                if(found){
                    return true
                }
            }
        }
    }
    
    return false
  }