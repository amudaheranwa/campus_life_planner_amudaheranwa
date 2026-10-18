export function validateTask(title, date, duration, category) {
    const titleError = document.getElementById("title-error");

    if (date === ""){
        alert("Please choose a date");
        return false;
    }

    const selectedDate = new Date(date);
    if (Number.isNaN(selectedDate.getTime())) {
        alert("Please enter a valid date");
        return false;
    }

    const cleanCategory = category.trim();
    if (cleanCategory === "") {
        alert("Please select a task category");
        return false;
    }

    const cleanTitle = title.trim();
    if(cleanTitle === ""){
        titleError.textContent = "Please enter a task title ";
        return false;
    }
    titleError.textContent = "";

    if (cleanTitle.length < 3 || cleanTitle.length > 50) {          
        alert("Title must be between 3 and 50 characters");
        return false;
    }

    const titlePattern = /^[a-zA-Z0-9\s.,!?'-]+$/;
    if (!titlePattern.test(cleanTitle)) {                            
        alert("Use letters in the alphabet, numbers,basic punctuation and spaces in the title.");
        return false;
    }

    const advancedPattern = /^(?=.*[0-9])[a-zA-Z0-9\s.,!?'-]+$/;    

    if (duration === ""|| Number(duration)<= 0){
        alert("Please enter a duration time above 0.");
        return false;
    }

    if (date === ""){
        alert("Please select a date.");
        return false;
    }

    return true;
}