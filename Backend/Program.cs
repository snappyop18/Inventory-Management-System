using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSingleton<MongoDbService>();

// 2. Configure CORS to allow your Live Server frontend to connect
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500", "http://localhost:5500")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// 3. Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// 4. Activate the CORS policy right before mapping routes
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();