import { LogOutIcon, User2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";


const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Jobs<span className=" text-[#F83002]">Here</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          {/* <li><Link>Home</Link></li>
          <li><Link>Jobs</Link></li>
          <li><Link>Browse</Link></li> */}
          <ul className="flex font-medium items-center gap-5 ">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="bg-[#9967ee] hover:bg-[#672acf]">Sign Up</Button>
              </Link>
              
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">ZyanHere</h4>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2Icon />
                      <Button variant="link">view profile</Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOutIcon />
                      <Button variant="link">logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;