import React from 'react';

const Creator = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-6xl space-y-24">
        {/* Title */}
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-teal-200 mb-2">CareCrypt</h1>
          <p className="text-lg text-gray-400">A Secure Blockchain-based Electronic Health Record System</p>
        </header>

        {/* Supervisor */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-indigo-300 mb-10">Project Supervisor</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwsQEAoNCgoICgsQCBYJEAgICBsIDQkWIBEiKyARHx8kKDQsJCYxJx8fLT0tMTU3ODA4Iys/RD84QzQ5ODcBCgoKDg0OGhAQGy0lHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLSstLS0tLS0wLS0tLf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA6EAABBAECAwUFBgUEAwAAAAABAAIDEQQSIQUxQQYTUWFxByIygaEUQlJikbEjM3LB0RVD4fAkgvH/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAJREAAgICAgICAgMBAAAAAAAAAAECEQMhEjEEQSJRE2EUJMEF/9oADAMBAAIRAxEAPwDzJCEq4zuGoSlVZsxoOkWT5JpN9CbS7JZZmtq7JPQc1BFlgkg7dVVe69RNknzqk2Sx4C/mVsoKtmDyP0WJM4/cBH5rTW5c29zSE1WxtVWhp+/XyThQNarHlurUUiHJse3IlBtr3g3dh3NbGDxlwoTOsfiY2isYMBv3t/AbJJGlpAvVfROhWdpBkMfuxzHir22KuxVR919+q8/ZI5p91zm+hW5wziJPuSvcHHkS/wB1yhqi07OjefJo/qeonTNH34x6DUqZA9fXdIs+ZfAsnKb+KQ+jaTDkt/A4/wBTqVchCObHwRMcl3RjB9U05En4gPRqjQlyY+KHGR55vefnSYf19d0qEh0IhCEgBCEJgCRKhICrk4xZRsEE9NqUC1M8Ax2OjgVloaHF2iDLl0tNczssocx4+ZtW+Jy7taOgtVow2twbW+NaMcjtkb31/wAJrnF3MolNnkE+Ntcx6FWZjNG39uaAP2VhostoXyBA2+StScOfGO8lbTLqvNJySGotq0UGDcXf60nv35Hl4K9Hw90mnRTfdJF76qVXKgcwljhRCSkm6G4SStkbAbvb0O6c5zTy6b1fJRkHx28t0NZ8t+YVkHRcKzNbdJNvaOfPUPFXlzOBIIntcTbfhNb7eK6VrgQCCCCLBG9rnyKmbwlaApEpSLMsEIQgASIQmAIQhIAQhCABCEJgNgEpil70NHue6QbJ81QWnCwNimrkWE7m1mE/sknaCBhTut7yeespQm5NanFvIutDbOxXUujnfYMYST06q/hYb5nNja2trsdB4p3DsF8pazZouy8r0Ts/wiOJtgW4gW93P0WOTLWkdGLx+W30ZnCuyOwc4iibALfeCn412blljMcb471WCdhzXZY2loPXco1m/caCR16Lk5u7PQWKNUcczsiQxje/aRoGqN8OoXXxA9Fn8e7NBkYdE17i3dzjzcvQH6jzbX1tVp6Iojbw5oU5XYnji1R4u9pbYLb81E5x5bALse0XZ6QF8uPH3jLssj+JvyXJvjrmCDdURVeS74TUkeVkxuDoib58/JdBwp1xM3utvqsBzStrgh/h789Z8kZOgx9mihFoXObAUiEJgCEIQwBCEJACEIQAIQhMB+eQyItbe5DRZtZamz59Tg0Gw391ChjgtGTxKDSQ4cjt6KvAPeaFs5MQc1zT4bFY+MCHtB2o0toyuJlONSOs4LtpAXdcOY4gC+fRcHwrKij3fZPgAtnG7Vhrm6WRkUNmSd5XqueWKT6OyGWK0ztmwu+Qb6p2TmQQNJkJvT8LG6isnE442Qhr8hsZLaDGUz6lZPEsPUDLI58uq3ND3l2gf5Wail2aym2viXMjtljE6Io5LJ063jYKszimQS57YpHxDmHQkCvG6WDBNNGyWTEwmvDBqc4sBNeKvcN47xF7X6IYDG490QGlliua2UY10czlK6vZ0mNIyRokY4AVve1LiO1D4p5D/p8D5XMJ73JhZcdrrOGxGamSh7WMBjfTqGSdqP6fqtMY0bWljGMY3o1g0ilimoOzdxeSNM807LcGGTJIyckNaBbWj33+QW/xHgIgYXwxd2wPpzA8yAfmU+FGcXiDe6aCydhppdoGofd3XVZ0jJATvRH8SB7dJ8LVTyNu/ROPDHi4+zzpCkyYtD5GfhkLPqo1oc7VAhFoQIEIRaABCEJACEIQAIQhMDLY2k9ACVIsQqi7H/iF++nTqsb7q8psdjXh8ZY0vIL2vuiSN9P7qoOmTJWhuAMcAyZPwNP8rlqV1/E4y9sQw4ogQKa5vdFwPUbJ8nDWysj7v4g3UR4q3HhS0wyNc97W6A57r0BJzXbLjjfSIOExP+1wxAtr3gNO4ItddNgyMIicNTDcjJb02PwLleHtLM2F35u7v8R6r0nIa1zA2QWDuOhB8Qs5yTZvjg+NfRyj+EFrtUVEEUWg0QrmPgO21ANHXe1YlkmZVtjkbfxS/wDjv+myvYsUzwAXQQtPMxHvpPrsFO/sul9DuGYbAZyOQlDLG4sNCTMirlS0mQsjYGx21o5b2fVZvEH7O33/AFUvZS0cr2njIYJmkB8MgnBuuS3ceTvmsyKsSY1BgIc4bfEVzvaTOa2FzQWuc5um+dKPs92l4ezFijypTjzxNLQ+j/FF81Sg3HRmppTdsocWcDPkFpsd8d1VtVI+Id9NlPALWPnMrA7nStLaq0cjkpNtAhC18Ps5nShrmxNY10XetdK/QH78vXdRPJGCuToKMhCsjAyaDhjzlhuniIuDqdR+pCruBBIcCCDRaRRHkmpxfTAEJEqYgSoQgBEJUIAzkIQUFiJj3OHvMcWuBDw9poghPKa4c/RAM6Pg+c0hrjFJqIs9yzWxx8a6LfMc0gAZGYWnnLL8deQ8fVcP2cy9Puk/C+qXfYXEWVZ8PVTk0zfC7Rj8ddFjOxHiNxax2rYaiujb2lx5IR3Bhlfp1tJdQH9XhS4Xtpx3W7uINiD70nKvJV+z+IXRvjlndC2QahUeouT4fG2L8nz4xOyHaHEJeMjKjlBbsWN0tHirPB+M4kjtGPkNJv8AlvNOXAv7PDU7RLrFEjQLorNfh5UDhKI52aXB7Zox8Pmn+OL9ilkyR7R7i5+25/uuW7RcXayo2lmtxoUbVXA7WMyIWt+DK006NzbBNc1x+dnOkke4kEtJJHxaVMMbvYsmVVaKfEspznPGuxd0TdKkWamONbteN/UJsslknrZ381scHxLxeIzPHutiaAT4l4A/ddcVVI4m7szuDxv16jYaAdui3LWPi5ZYdJGpl8uRatRjwQCDYPVLNjlF76Hikmi7gyYwLhlQySMPKSCXu5IvMdCut4JxYMYY4cn7TBG3WGzxfZ54APoQuLgie9zWRsfI9ztLY4263OK7DHxYsRuLj55jGTkvDRhwblo1DdxvxC8jzoRap7b9f6bpnQ8OlGrUxj43Fg+KAsoXen9Vy3tBhqaB/wCKAithVO8F3bI6Ntj1NcdWth8lx3tELXfZnNrZ5jtnLkvF8Cf9tV1s3mvgcWlSJV9ScwoQhCABCEIAzkWhIUFiFCCkQBSjnMUriORN1ysLp8Di0dEk7BupcxxCImnt5gb+ipxTuAIBO4WvBTRksjxyNjFxXzvyJKJd/NurFkra4VCwV9oc0UKGt9UqXZ/Pjjbpc4AmhZW1PhMkp4kjDKvbcrPJJ3Xo6MGla7L+NxLBaA2NpmeeYjjpq3I3tdDI6SPYg+6W0FgcJgx42uLgx9vJBG1fNHGe0BZGQ0M0lvwX8Y8lm1b0bSm6uRzOVLiMe/SxwcXmnsdoa3yWFJKRq3O5538SMmYuJIHX0UG5O67Ixo82c7J8WB0j2MYCST+i9C7U8O+wcMwcZw05GVk/a3sI0lrGN2H6uW/7KewehsfEM+OnH+JDA8dOjz/hc57W+J9/xF7Gm2QQNxwLvc7n91tihc0YzlUaOGjG5Uj4rBokHyNJGDdWa5L0FFM5rop42XNGQ+CaeF4G0kMxjcFP/qeSZBM+eSSYGxLOe/d9VXlZRI6XYTFzyxQb2kaKb+zqsTt9xRgja50ErW7AOi7o14WFX4x2qlySwyQtY1oNMZJq36myueS0uWP/ADvGU+agk/0afyMlVZpDiTOrH/rakbxGI/jHq21lUils/FgH55G2zKiPKRnzNKUOHQg+htc+W8lIwVyJHpss34a9MteS/aN1CoYuYbDZDY6PQuWeGUHTRvHJGSsYkK0eHcHyclsr8Zgk7sgFmsNcb8Fo4/Y3iDmGSSNkIraKR9Pf5eXzXLPPjhqUkbUWeyfZmLIY6bJ7zSSWsZehrvzWr3Eey2DFqkLcgsqjG2UvLT+IJnZ/iMmC1+Nmtnjo98IgA90YP3ufJb2RlwZEZdHI2VhiO2q6Kr8ia+LMm3Z5hnxNBdp+HWY68wsTIxHCy3cc6HQLcka4vyGC71GYDmfNZ0+Q0Bw+ImhXzV4XLpEtqUdmdHIRW6v4/EZG1bnaR0urVSGB0r3BtBxBeGgbeiSbFmj+NjgPHoutxT0zNNraNR3GJKAa8gC/d5qlPmveAHOJA6XaplykjgJokGr281PFIbnKQCyQG3zqgvXfZn7Or7rO4nGCNpIsN4v/ANnf4SezjsExvd5nEWAyfzGYzt+78z5r1tjqADRpAHorRkxOIZDIo3bgDQb6aQvmLimcZ8jKnd/uZTpQfIu2+lL272i8TMWDnPBpzofs7TdbuNLwMLpwfZnP6LkYHl+6eVTYD0JHoaTpXOOxO3WtrXWmY0GQ9pIDd65u6eigT6TAs5FIeAlAStCE6AAEoCAnAKqEJW/oE+kRCy8nxAUkmw87TSFZClSgVZKFm0VZ7JjYsUBkYzu9BaHl7YRDy8xzSZM8Vgd6Gw6O8c7XY3Oy5TiHaTvmsikjmgc0kEuFO5dPJS9nODuzG97l5EmkynGjji90MDRu6vNfBfxWlzyuj2+X0Ve1OZHLNjujygGsYQ3I7gyMdvuLVCSU47u+iliMRAe4MktoPgndsZeHRNjx8d78nJY91lj7jx992+B9Fxr3E8zfl0C9zxPEeTHHtL9rZx55q/2W+IcRL5HSRao7v3gdJKzinOSBevHHGCpHNdm/2RwS6SSYDV3DBKW87F7/AEXo+ZwDGmpzWNI7v+WRYfsuY9lLCZuIGgQMVjS07gguK7rFbo7yOj7hLQD4dFM1scWcFxDhmFw4d/PFGXOeWxYrPffMfnyA6lcdk8Se+Xv444MZ2rUGYzKaw+O61vaDkyyZ04kbI2OMDGiD26dTR975mysTHi+874QlGFsblSPYfZ12+jm0YvFRHBMXCOPNA7uKb8rvA+fIr0zLdpFDYnZfPHZHs6cx7pMluSMNp06YBvO78C9b4JNPEPs85fLjsaGwyyyd5LA38Dz1HgU5xS6Ji/s5T2wZlRYmOD8c5lI8mj/leXALrfaTxSPIzXNhcHxwM+z6gbBde/8AhcoF1Yo1Ezk9igJyQIWpAjqokhQAKWTw8P3TGhSxoeEtIAShUIVoTwEgUrGppCYQt+I/nKjJ1HyCfZ0gDmST/wApSABt05piK8lk+VoStCVRRVnacWysRsbJDJBIx38ItZJqkj23ryXJDjOU1j4YJ5o4XOJIadDnKi97nG3GykpeV43gRxr5bOzL5Dl0IAmuCkATXL0K0c1kIHigD908hIzmPVTRVnonsdbcvE/OFrR4cyu+nZTo3kbH3HHpY5WuC9kE7e8mj+/u8+YNL0qdpa4jeisZ9lROC9ovCnSYxyHQsYYmg69duIsLzeSOgBqIYSLbV0F6r7Ssh/2Mt5NfksjO/MarXl+S3lXNXj2myZdpHunC4oIYMaDBaO6EQDZOeuxer+6yO3nHm4GK5kLwcye42G7LB1k+SzPZv2gidizw5L2sOG0zd48/7J/wbH6LzvtNxh+bkzZBtrCe7iiJ/lMHIKUm5FXSKcQNAmyTvZ3KeFZikbpaxwiNAhpk9wMJ+8aFn9VJII26BG+PJkLrfeP3YePws/8AgWv5uOnFkcL9lOkl8/JamRw1vdZOQ2XTG2RkcbJR3b575trnY/RZLug+a2hkjNXEiUXHsafqlaEtJwCqhAAnhqVrVKG7KkhNkVKVoofJIAnuGypCbIXGhfMkcv2CQtNAfMuOydE3U4uPwNO3mfFPmdqNN5eKQEQCE4hIkBUAQEJa3WBoI/l8kiWTqkQAxwSM5/JOcmj739JSGdR7Ns3uuI4bSfclccY/Pl9V7zxOFp6V6dF87diN+I8JHT/Umfuvb/aJx37FjSvaQMiQdxCOZDq+P5DdYz2y46POPaPxts0sODDThDL3ksoN6n8tHyXKZDPDwUGBbnOe4km/icbJPirOW8NBPM8gPNb44pRMpu2ZneSNMrWPewPZ3b2tdQkbd6T+gSMbu0fmRXU7nmnwj3h5AlEY7G2WCh1VR39d0tJpC3IGgf8AT0TeZJ6KR3L12SwBp1BxLaGxaNVnwU1QxrWp4CeGedJaHh/dUkKwYPU/JSgHoP13TQn6vE19FSJY3TR8fomS8j6KRzhtW/n0UU3I+iBDYjq2GzQK8LTnAjwCiikqmtF+aUk6gCpKHhpQpikVUKzOCAhDVzmo16UJSmt5I9gBTAPi/oKe5DB8X9JRQE/CMp0E+NkMFuhyWzgcrp10ul9p3aVmflF+O5xxY2iKEHbUOr/mf2XKtaiRvw+Hgk4asLLvDY6b6lQ5cmpxr4RsPPzU5kAj93ZxOlVCFaWqJ92RlPxhu70TKU2KPi9ULsb6JikISlC0IGO514BKE2zz80ovx/skUS/9rmjfoK8ymtCkCpEjC0+J+Wyc1g8P7p4HJLSdCsSlHL/ZTKKRAipju8PDmpccW4kqrB1HgSFbZss49FtUWCUiYQUq0smigOiUIQuY1Apo6+qVCYhE6Mc/QoQmuwfRI0JaQhWIIwTzuuiV4QhFUBHSlxhsf6kIQuwfRPSa/l5nZCFbII6SgIQpKHhPCEKkIcnWhCokRRuSoQBnN2e8fmV2NvJCFlAuRYCEIWhFn//Z"
              alt="Supervisor"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
            <div>
              <h3 className="text-2xl font-semibold">Dr. Pranav Ratta</h3>
              <p className="text-gray-400">Assistant Professor, Dept. of Computer Science</p>
            </div>
          </div>
        </section>

        {/* Creators */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-green-300 mb-10">Meet the Creators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 px-6">
            {/* Creator 1 */}
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                // src="https://avatars.githubusercontent.com/u/73985710?v=4"
                src='https://imgs.search.brave.com/nVgLVAsFRhHPRldXLCVQQO3qGZmkk53ruGx8ChsliRM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzUzL2Q3/LzNlLzUzZDczZTc4/OTM4NTU2OWVmYjA0/MjRjNWFlMDYzYjAw/LmpwZw'
                alt="Harash Parihar"
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-green-400"
              />
              <h3 className="mt-4 text-xl font-semibold">Harash Parihar</h3>
              <p className="text-green-200">Frontend Developer & Blockchain Developer</p>
            </div>

            {/* Creator 2 */}
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS-LJHq6DifGqp4vqls0ezt3Lw-vkNANbuNw&s"
                src='https://imgs.search.brave.com/c7EPwUje4hcSC6MBqf8LmEYQQWfAw2lCHr_0bvDXQr8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/YW5pbWUtcGxhbmV0/LmNvbS9jaGFyYWN0/ZXJzL3ByaW1hcnkv/a2FuYXRhLWthdGFn/aXJpLTEtMjg1eDM5/OS53ZWJwP3Q9MTY5/NjI2Mjg5Ng'
                alt="Harsh Bardhan"
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-green-400"
              />
              <h3 className="mt-4 text-xl font-semibold">Harsh Bardhan</h3>
              <p className="text-green-200">Frontend Developer & UI/UX Designer</p>
            </div>
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default Creator;
