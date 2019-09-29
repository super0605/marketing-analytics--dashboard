import {Task} from "../constants/interfaces";

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInRadians: number
) => {
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

export const arcPathCommand = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(" ");

  return d;
};


export const isTaskListCompleted = (tasks: Task[]): boolean => {
  if (tasks.length === 0) {
    return false;
  } else {
    return tasks.every(task => task.completed);
  }
}

export const validateEmail = (email: string): boolean => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const cutTextAtMaxLength = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substr(0, maxLength).concat("...") : text;
};