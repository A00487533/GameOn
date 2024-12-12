using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameOnV2.Server.Migrations
{
    /// <inheritdoc />
    public partial class datechange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Posts",
                newName: "Date1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date1",
                table: "Posts",
                newName: "Date");
        }
    }
}
